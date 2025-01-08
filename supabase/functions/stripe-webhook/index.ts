import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { handleCustomerCreation } from './handlers/customerHandler.ts'
import { handleOrderCreation } from './handlers/orderHandler.ts'
import { handleOrderItemCreation } from './handlers/orderItemHandler.ts'
import { sendOrderConfirmationEmail } from './handlers/emailHandler.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200 
    })
  }

  try {
    console.log('🎯 Webhook request received')

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing required environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.error('❌ No Stripe signature found')
      return new Response(
        JSON.stringify({ error: 'No Stripe signature found' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const bodyArray = await req.arrayBuffer()
    const body = new TextDecoder().decode(bodyArray)
    
    let event
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret,
        undefined,
        Stripe.createSubtleCryptoProvider()
      )
    } catch (err) {
      console.error('❌ Error verifying webhook signature:', err)
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('✅ Processing event type:', event.type)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      console.log('📦 Processing completed checkout session:', session.id)

      try {
        const customer = await handleCustomerCreation(session, supabase)
        console.log('👤 Customer processed:', customer)

        const order = await handleOrderCreation(session, customer, supabase)
        console.log('📝 Order created:', order)

        const orderItems = await handleOrderItemCreation(session, order, supabase)
        console.log('🛍️ Order items created:', orderItems)

        // Enviar email de confirmación
        await sendOrderConfirmationEmail(customer, order)

        // Registrar el evento de pago completado
        const paymentEvent = {
          order_id: order.id,
          type: 'payment_processed',
          description: 'Pago completado exitosamente',
          metadata: {
            payment_intent: session.payment_intent,
            payment_status: session.payment_status,
            amount: session.amount_total
          }
        }

        const { error: eventError } = await supabase
          .from('order_events')
          .insert(paymentEvent)

        if (eventError) {
          console.error('❌ Error creating payment event:', eventError)
        }

        return new Response(
          JSON.stringify({ received: true, order_id: order.id }), 
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      } catch (error) {
        console.error('❌ Error processing webhook:', error)
        return new Response(
          JSON.stringify({ 
            received: true, 
            error: error.message,
            warning: 'Processed with errors' 
          }), 
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        )
      }
    }

    return new Response(
      JSON.stringify({ received: true }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Fatal error processing webhook:', error)
    return new Response(
      JSON.stringify({ 
        received: true, 
        error: error.message,
        warning: 'Fatal error occurred' 
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})