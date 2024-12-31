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
  console.log('🔔 Webhook request received')
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders
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
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const payload = await req.text()
    console.log('📦 Webhook payload received')
    
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      endpointSecret
    )
    
    console.log('✅ Webhook signature verified')
    console.log('🔔 Processing webhook event:', event.type)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        
        try {
          console.log('💳 Processing completed checkout session:', session.id)
          
          const customer = await handleCustomerCreation(session, supabase)
          console.log('👤 Customer created/updated:', customer.id)
          
          const order = await handleOrderCreation(session, customer, supabase)
          console.log('📦 Order created:', order.id)
          
          await handleOrderItemCreation(session, order, supabase)
          console.log('✅ Order items created for order:', order.id)
        } catch (error) {
          console.error('❌ Error processing checkout:', error)
          return new Response(
            JSON.stringify({ error: error.message }), 
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }
        break
      }
    }

    return new Response(
      JSON.stringify({ received: true }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (err) {
    console.error('❌ Error processing webhook:', err)
    return new Response(
      JSON.stringify({ error: err.message }), 
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})