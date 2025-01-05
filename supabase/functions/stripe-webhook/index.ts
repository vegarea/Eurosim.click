import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import Stripe from 'https://esm.sh/stripe@12.18.0?dts'
import { handleCustomerCreation } from './handlers/customerHandler.ts'
import { handleOrderCreation } from './handlers/orderHandler.ts'
import { handleOrderItemCreation } from './handlers/orderItemHandler.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Webhook request received')

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Server configuration error')
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      throw new Error('No Stripe signature found')
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
      console.error('Error verifying webhook signature:', err)
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed' }), 
        { status: 400, headers: corsHeaders }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log('Processing event type:', event.type)

    switch (event.type) {
      case 'checkout.session.completed':
      case 'payment_intent.succeeded':
        // Obtener la sesión de checkout relacionada
        let session;
        if (event.type === 'payment_intent.succeeded') {
          const paymentIntent = event.data.object;
          console.log('Payment Intent:', paymentIntent);
          
          // Buscar la sesión relacionada
          const sessions = await stripe.checkout.sessions.list({
            payment_intent: paymentIntent.id,
            expand: ['data.shipping']
          });
          
          session = sessions.data[0];
          console.log('Related session found:', session);
        } else {
          session = event.data.object;
        }

        if (!session) {
          throw new Error('No session found');
        }

        // Procesar la orden
        const customer = await handleCustomerCreation(session, supabase)
        console.log('Customer processed:', customer)

        const order = await handleOrderCreation(session, customer, supabase)
        console.log('Order created:', order)

        const orderItems = await handleOrderItemCreation(session, order, supabase)
        console.log('Order items created:', orderItems)
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(
      JSON.stringify({ received: true }), 
      { headers: corsHeaders }
    )

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers: corsHeaders }
    )
  }
})