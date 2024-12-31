import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  try {
    let event;
    const payload = await req.text();

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed.`, err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log('🔔 Webhook received:', event.type);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        try {
          // Extract customer information from session metadata
          const customerData = {
            name: session.metadata.customer_name,
            email: session.customer_email,
            phone: session.metadata.customer_phone,
            passport_number: session.metadata.customer_passport,
            birth_date: session.metadata.customer_birth_date,
            gender: session.metadata.customer_gender,
            stripe_customer_id: session.customer,
          };

          console.log('Creating customer:', customerData);

          // Insert customer
          const { data: customer, error: customerError } = await supabase
            .from('customers')
            .insert(customerData)
            .select()
            .single();

          if (customerError) throw customerError;

          console.log('Customer created:', customer);

          // Create order
          const orderData = {
            customer_id: customer.id,
            product_id: session.metadata.product_id,
            status: 'processing',
            type: session.metadata.order_type,
            total_amount: session.amount_total,
            quantity: 1,
            payment_method: 'stripe',
            payment_status: 'completed',
            stripe_payment_intent_id: session.payment_intent,
            stripe_receipt_url: session.receipt_url,
          };

          console.log('Creating order:', orderData);

          const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();

          if (orderError) throw orderError;

          console.log('Order created:', order);

          // Create order item
          const orderItemData = {
            order_id: order.id,
            product_id: session.metadata.product_id,
            quantity: 1,
            unit_price: session.amount_total,
            total_price: session.amount_total,
            metadata: {
              product_type: session.metadata.order_type,
            }
          };

          console.log('Creating order item:', orderItemData);

          const { error: orderItemError } = await supabase
            .from('order_items')
            .insert(orderItemData);

          if (orderItemError) throw orderItemError;

          console.log('Order item created successfully');
        } catch (error) {
          console.error('Error processing successful checkout:', error);
          throw error;
        }
        break;
      }

      case 'checkout.session.expired': {
        console.log('Checkout session expired:', event.data.object);
        // Aquí podrías limpiar datos temporales o notificar al usuario
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('Payment failed:', paymentIntent);
        
        try {
          // Update order status if exists
          if (paymentIntent.metadata.order_id) {
            const { error } = await supabase
              .from('orders')
              .update({ 
                status: 'payment_failed',
                payment_status: 'failed',
                metadata: {
                  ...paymentIntent.metadata,
                  failure_message: paymentIntent.last_payment_error?.message,
                  failure_code: paymentIntent.last_payment_error?.code,
                }
              })
              .eq('stripe_payment_intent_id', paymentIntent.id);

            if (error) throw error;
            console.log('Order status updated to failed');
          }
        } catch (error) {
          console.error('Error processing payment failure:', error);
          throw error;
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent);
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object;
        console.log('Payment canceled:', paymentIntent);
        
        try {
          // Update order status if exists
          if (paymentIntent.metadata.order_id) {
            const { error } = await supabase
              .from('orders')
              .update({ 
                status: 'cancelled',
                payment_status: 'cancelled',
                metadata: {
                  ...paymentIntent.metadata,
                  cancellation_reason: paymentIntent.cancellation_reason,
                }
              })
              .eq('stripe_payment_intent_id', paymentIntent.id);

            if (error) throw error;
            console.log('Order status updated to cancelled');
          }
        } catch (error) {
          console.error('Error processing payment cancellation:', error);
          throw error;
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) {
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ error: err.message }), 
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});