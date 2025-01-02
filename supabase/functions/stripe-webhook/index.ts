import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { handleCustomerCreation } from './handlers/customerHandler.ts'
import { handleOrderCreation } from './handlers/orderHandler.ts'
import { handleOrderItemCreation } from './handlers/orderItemHandler.ts'
import { Logger } from './logger.ts'
import { corsHeaders, requiredEnvVars, validateEnvVars } from './config.ts'
import { handleSuccess, handleError } from './responseHandler.ts'

serve(async (req) => {
  const requestId = crypto.randomUUID()
  const logger = new Logger(requestId)
  
  logger.info('New webhook request received', {
    method: req.method,
    url: req.url
  })

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    logger.info('Handling CORS preflight request')
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Validate environment variables
    validateEnvVars(logger)

    // Initialize Stripe
    const stripe = new Stripe(requiredEnvVars.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-10-16',
    })
    logger.success('Stripe initialized')

    // Get and validate Stripe signature
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      logger.error('No stripe-signature header found', {
        headers: Object.fromEntries(req.headers.entries())
      })
      return handleError(logger, requestId, new Error('Missing stripe-signature header'), 401)
    }
    logger.info('Stripe signature found', { signature })

    // Get request payload
    const payload = await req.text()
    logger.info('Request payload received')

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        requiredEnvVars.STRIPE_WEBHOOK_SECRET!
      )
      logger.success('Webhook signature verified', { 
        eventType: event.type,
        eventData: event.data 
      })
    } catch (err) {
      logger.error('Error verifying webhook signature', {
        error: err,
        signature,
        payload
      })
      return handleError(logger, requestId, err, 401)
    }

    // Initialize Supabase client
    const supabase = createClient(
      requiredEnvVars.SUPABASE_URL!,
      requiredEnvVars.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
    logger.success('Supabase client initialized')

    // Process webhook event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      logger.info('Processing completed checkout session', { session })

      try {
        const customer = await handleCustomerCreation(session, supabase)
        logger.success('Customer processed', { customer })
        
        const order = await handleOrderCreation(session, customer, supabase)
        logger.success('Order created', { order })
        
        const orderItems = await handleOrderItemCreation(session, order, supabase)
        logger.success('Order items created', { orderItems })

        return handleSuccess(logger, requestId, {
          session_id: session.id,
          customer_id: customer.id,
          order_id: order.id,
          order_items: orderItems
        })
      } catch (error) {
        return handleError(logger, requestId, error)
      }
    }

    // Handle unprocessed event types
    logger.warn('Unhandled event type', { eventType: event.type })
    return handleSuccess(logger, requestId, { event_type: event.type })

  } catch (err) {
    return handleError(logger, requestId, err)
  }
})