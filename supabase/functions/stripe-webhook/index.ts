import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { handleCustomerCreation } from './handlers/customerHandler.ts'
import { handleOrderCreation } from './handlers/orderHandler.ts'
import { handleOrderItemCreation } from './handlers/orderItemHandler.ts'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

serve(async (req) => {
  console.log('🔔 Webhook request received');
  
  // Log all headers for debugging
  const headers = Object.fromEntries(req.headers.entries());
  console.log('📝 Request Headers:', headers);
  console.log('🔑 Webhook Secret:', endpointSecret ? 'Configured' : 'Missing');
  
  // Handle CORS
  if (req.method === 'OPTIONS') {
    console.log('👌 Handling CORS preflight request');
    return new Response(null, { 
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    });
  }

  if (req.method !== 'POST') {
    console.error('❌ Method not allowed:', req.method);
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders
    });
  }

  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error('❌ No stripe-signature header found');
    return new Response('No stripe-signature header', { 
      status: 400,
      headers: corsHeaders
    });
  }

  try {
    const payload = await req.text();
    console.log('📦 Webhook payload received');
    console.log('📝 Payload:', payload);
    
    console.log('🔍 Attempting to verify webhook signature');
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      endpointSecret
    );
    
    console.log('✅ Webhook signature verified');
    console.log('🔔 Processing webhook event:', event.type);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        try {
          console.log('💳 Processing completed checkout session:', session.id);
          console.log('📝 Session data:', JSON.stringify(session, null, 2));
          
          const customer = await handleCustomerCreation(session, supabase);
          console.log('👤 Customer created/updated:', customer.id);
          
          const order = await handleOrderCreation(session, customer, supabase);
          console.log('📦 Order created:', order.id);
          
          await handleOrderItemCreation(session, order, supabase);
          console.log('✅ Order items created for order:', order.id);

          console.log('✨ Checkout completed successfully');
        } catch (error) {
          console.error('❌ Error processing successful checkout:', error);
          console.error('Error details:', {
            message: error.message,
            stack: error.stack
          });
          throw error;
        }
        break;
      }

      case 'checkout.session.expired':
        console.log('⏰ Checkout session expired:', event.data.object);
        break;

      case 'payment_intent.payment_failed':
      case 'payment_intent.canceled':
        await handleFailedPayment(event.data.object, supabase);
        break;

      default:
        console.log(`⚠️ Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error('❌ Error processing webhook:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack
    });
    return new Response(
      JSON.stringify({ error: err.message }), 
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function handleFailedPayment(paymentIntent: any, supabase: any) {
  if (!paymentIntent.metadata.order_id) return;

  const status = paymentIntent.status === 'canceled' ? 'cancelled' : 'payment_failed';
  const paymentStatus = paymentIntent.status === 'canceled' ? 'cancelled' : 'failed';

  try {
    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        payment_status: paymentStatus,
        metadata: {
          ...paymentIntent.metadata,
          failure_message: paymentIntent.last_payment_error?.message,
          failure_code: paymentIntent.last_payment_error?.code,
          cancellation_reason: paymentIntent.cancellation_reason,
        }
      })
      .eq('stripe_payment_intent_id', paymentIntent.id);

    if (error) throw error;
    console.log(`📝 Order status updated to ${status}`);
  } catch (error) {
    console.error(`❌ Error processing payment ${status}:`, error);
    throw error;
  }
}