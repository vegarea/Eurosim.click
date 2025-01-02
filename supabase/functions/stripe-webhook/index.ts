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
  'Content-Type': 'application/json'
}

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

serve(async (req) => {
  console.log('🔔 Webhook request received')
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    
    if (!signature) {
      console.error('❌ No stripe-signature header found')
      return new Response(
        JSON.stringify({ error: 'No stripe-signature header' }), 
        { 
          status: 400,
          headers: corsHeaders
        }
      )
    }

    const payload = await req.text()
    console.log('📦 Webhook payload received:', payload)
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      )
      console.log('✅ Webhook signature verified')
    } catch (err) {
      console.error('❌ Error verifying webhook signature:', err)
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }), 
        { 
          status: 400,
          headers: corsHeaders
        }
      )
    }
    
    console.log('🔔 Processing webhook event:', event.type)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log('💳 Processing completed checkout session:', JSON.stringify(session, null, 2))
        
        try {
          console.log('🔍 Session metadata:', session.metadata)
          console.log('👤 Customer data:', {
            email: session.customer_email,
            customer_id: session.customer,
          })
          
          const customer = await handleCustomerCreation(session, supabase)
          console.log('✅ Customer created/updated:', customer)
          
          const order = await handleOrderCreation(session, customer, supabase)
          console.log('✅ Order created:', order)
          
          await handleOrderItemCreation(session, order, supabase)
          console.log('✅ Order items created')

          return new Response(
            JSON.stringify({ 
              received: true,
              session_id: session.id,
              customer_id: customer.id,
              order_id: order.id
            }), 
            { 
              headers: corsHeaders,
              status: 200
            }
          )
        } catch (error) {
          console.error('❌ Error processing checkout:', error)
          console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            details: error.details || 'No additional details'
          })
          return new Response(
            JSON.stringify({ 
              error: error.message,
              details: error.stack,
              data: error.details || 'No additional details'
            }), 
            { 
              status: 500,
              headers: corsHeaders
            }
          )
        }
      }
      default: {
        console.log('⚠️ Unhandled event type:', event.type)
        return new Response(
          JSON.stringify({ 
            received: true,
            event_type: event.type
          }), 
          { 
            headers: corsHeaders,
            status: 200
          }
        )
      }
    }
  } catch (err) {
    console.error('❌ Error processing webhook:', err)
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      details: err.details || 'No additional details'
    })
    return new Response(
      JSON.stringify({ 
        error: err.message,
        details: err.stack,
        data: err.details || 'No additional details'
      }), 
      { 
        status: 400,
        headers: corsHeaders
      }
    )
  }
})