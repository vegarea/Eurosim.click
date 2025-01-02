import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { handleCustomerCreation } from './handlers/customerHandler.ts'
import { handleOrderCreation } from './handlers/orderHandler.ts'
import { handleOrderItemCreation } from './handlers/orderItemHandler.ts'

// Initialize Stripe with detailed logging
console.log('🚀 Initializing Stripe webhook handler')
const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeKey) {
  console.error('❌ STRIPE_SECRET_KEY not found in environment variables')
  throw new Error('STRIPE_SECRET_KEY is required')
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
})
console.log('✅ Stripe initialized successfully')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Content-Type': 'application/json'
}

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
if (!endpointSecret) {
  console.error('❌ STRIPE_WEBHOOK_SECRET not found in environment variables')
  throw new Error('STRIPE_WEBHOOK_SECRET is required')
}
console.log('✅ Webhook secret loaded')

serve(async (req) => {
  const requestId = crypto.randomUUID()
  console.log(`🔔 [${requestId}] Webhook request received`)
  
  // Log request details
  const method = req.method
  const url = req.url
  console.log(`📝 [${requestId}] Request details:`)
  console.log(`   Method: ${method}`)
  console.log(`   URL: ${url}`)
  
  // Log all headers for debugging
  const headers = Object.fromEntries(req.headers.entries())
  console.log(`📋 [${requestId}] Request headers:`, JSON.stringify(headers, null, 2))
  console.log(`🔑 [${requestId}] Stripe signature:`, headers['stripe-signature'])
  
  if (req.method === 'OPTIONS') {
    console.log(`👋 [${requestId}] Handling CORS preflight request`)
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    
    if (!signature) {
      console.error(`❌ [${requestId}] No stripe-signature header found`)
      console.error(`   Headers received:`, JSON.stringify(headers, null, 2))
      return new Response(
        JSON.stringify({ 
          error: 'Missing stripe-signature header',
          requestId,
          receivedHeaders: headers
        }), 
        { 
          status: 401,
          headers: corsHeaders
        }
      )
    }

    const payload = await req.text()
    console.log(`📦 [${requestId}] Raw webhook payload:`, payload)
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      )
      console.log(`✅ [${requestId}] Webhook signature verified`)
      console.log(`🎯 [${requestId}] Event type:`, event.type)
      console.log(`📝 [${requestId}] Event data:`, JSON.stringify(event.data, null, 2))
    } catch (err) {
      console.error(`❌ [${requestId}] Error verifying webhook signature:`, err)
      console.error(`   Signature:`, signature)
      console.error(`   Payload:`, payload)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid signature',
          requestId,
          details: err.message,
          signature: signature
        }), 
        { 
          status: 401,
          headers: corsHeaders
        }
      )
    }

    // Initialize Supabase client with logging
    console.log(`🔌 [${requestId}] Initializing Supabase client`)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      console.error(`❌ [${requestId}] Missing Supabase credentials`)
      throw new Error('Missing required Supabase environment variables')
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    console.log(`✅ [${requestId}] Supabase client initialized with service role`)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log(`💳 [${requestId}] Processing completed checkout session:`, JSON.stringify(session, null, 2))
        console.log(`🔍 [${requestId}] Session metadata:`, session.metadata)
        
        try {
          console.log(`👤 [${requestId}] Starting customer creation/update...`)
          const customer = await handleCustomerCreation(session, supabase)
          console.log(`✅ [${requestId}] Customer processed:`, customer)
          
          console.log(`📦 [${requestId}] Starting order creation...`)
          const order = await handleOrderCreation(session, customer, supabase)
          console.log(`✅ [${requestId}] Order created:`, order)
          
          console.log(`🛍️ [${requestId}] Starting order items creation...`)
          const orderItems = await handleOrderItemCreation(session, order, supabase)
          console.log(`✅ [${requestId}] Order items created:`, orderItems)

          return new Response(
            JSON.stringify({ 
              received: true,
              requestId,
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
          console.error(`❌ [${requestId}] Error processing checkout:`, error)
          console.error(`   Error details:`, {
            name: error.name,
            message: error.message,
            stack: error.stack,
            details: error.details || 'No additional details',
            code: error.code,
            hint: error.hint
          })
          
          return new Response(
            JSON.stringify({ 
              error: error.message,
              requestId,
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
        console.log(`⚠️ [${requestId}] Unhandled event type:`, event.type)
        return new Response(
          JSON.stringify({ 
            received: true,
            requestId,
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
    console.error(`❌ [${requestId}] Fatal error processing webhook:`, err)
    console.error(`   Error details:`, {
      name: err.name,
      message: err.message,
      stack: err.stack,
      details: err.details || 'No additional details'
    })
    return new Response(
      JSON.stringify({ 
        error: err.message,
        requestId,
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