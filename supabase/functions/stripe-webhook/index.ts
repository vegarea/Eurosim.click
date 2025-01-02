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
  console.log('Request method:', req.method)
  console.log('Request headers:', Object.fromEntries(req.headers.entries()))
  
  if (req.method === 'OPTIONS') {
    console.log('👋 Handling CORS preflight request')
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
    console.log('📦 Raw webhook payload:', payload)
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      )
      console.log('✅ Webhook signature verified')
      console.log('🎯 Event type:', event.type)
      console.log('📝 Event data:', JSON.stringify(event.data, null, 2))
    } catch (err) {
      console.error('❌ Error verifying webhook signature:', err)
      console.error('Signature:', signature)
      console.error('Payload:', payload)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid signature',
          details: err.message
        }), 
        { 
          status: 400,
          headers: corsHeaders
        }
      )
    }

    // Inicializar el cliente de Supabase con la configuración correcta
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    console.log('🔑 Initializing Supabase client with URL:', supabaseUrl)
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration')
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('🔌 Supabase client initialized with service role')

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log('💳 Processing completed checkout session:', JSON.stringify(session, null, 2))
        console.log('🔍 Session metadata:', session.metadata)
        
        try {
          console.log('👤 Starting customer creation/update...')
          const customer = await handleCustomerCreation(session, supabase)
          console.log('✅ Customer processed:', customer)
          
          console.log('📦 Starting order creation...')
          const order = await handleOrderCreation(session, customer, supabase)
          console.log('✅ Order created:', order)
          
          console.log('🛍️ Starting order items creation...')
          const orderItems = await handleOrderItemCreation(session, order, supabase)
          console.log('✅ Order items created:', orderItems)

          console.log('🎉 Webhook processing completed successfully')
          return new Response(
            JSON.stringify({ 
              received: true,
              session_id: session.id,
              customer_id: customer.id,
              order_id: order.id,
              order_items: orderItems
            }), 
            { 
              headers: corsHeaders,
              status: 200
            }
          )
        } catch (error) {
          console.error('❌ Error processing checkout:', error)
          console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            details: error.details || 'No additional details',
            code: error.code,
            hint: error.hint
          })
          
          if (error.message.includes('Database error')) {
            console.error('Database error details:', {
              code: error.code,
              message: error.message,
              details: error.details,
              hint: error.hint
            })
          }
          
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
    console.error('❌ Fatal error processing webhook:', err)
    console.error('Error details:', {
      name: err.name,
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