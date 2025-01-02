import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import Stripe from 'https://esm.sh/stripe@12.18.0?dts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Log request details
    console.log('Webhook request received:', {
      method: req.method,
      url: req.url,
      headers: Object.fromEntries(req.headers.entries())
    })

    // Validate environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error('Missing required environment variables')
      throw new Error('Server configuration error')
    }

    console.log('Environment variables validated')

    // Initialize Stripe with specific configuration for Deno
    const stripe = Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
      maxNetworkRetries: 2,
    })

    // Get the signature from headers
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.error('No Stripe signature found in headers')
      throw new Error('No Stripe signature found')
    }

    console.log('Stripe signature found:', signature.substring(0, 10) + '...')

    // Get request body as text
    const body = await req.text()
    console.log('Request body length:', body.length)
    console.log('Request body preview:', body.substring(0, 100))

    // Verify the event
    let event
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        webhookSecret,
        undefined,
        Stripe.createSubtleCryptoProvider()
      )
      console.log('Event constructed successfully:', event.type)
    } catch (err) {
      console.error('Error verifying webhook signature:', err)
      return new Response(
        JSON.stringify({ error: 'Webhook signature verification failed', details: err.message }), 
        { status: 400, headers: corsHeaders }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    console.log('Supabase client initialized')

    // Handle the event
    console.log('Processing event type:', event.type)

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        console.log('Checkout session completed:', session.id)
        
        // Insert payment record
        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            order_id: session.metadata?.order_id,
            amount: session.amount_total,
            currency: session.currency,
            status: 'completed',
            provider_payment_id: session.payment_intent,
            provider_receipt_url: session.receipt_url,
            metadata: {
              stripe_session_id: session.id,
              payment_status: session.payment_status,
              customer_email: session.customer_details?.email
            }
          })

        if (paymentError) {
          console.error('Error inserting payment record:', paymentError)
          throw paymentError
        }

        console.log('Payment record inserted successfully')

        // Update order status
        if (session.metadata?.order_id) {
          const { error: orderError } = await supabase
            .from('orders')
            .update({ 
              payment_status: 'completed',
              status: 'processing',
              stripe_payment_intent_id: session.payment_intent,
              stripe_receipt_url: session.receipt_url,
              updated_at: new Date().toISOString()
            })
            .eq('id', session.metadata.order_id)

          if (orderError) {
            console.error('Error updating order:', orderError)
            throw orderError
          }

          console.log('Order updated successfully')
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(
      JSON.stringify({ received: true, event: event.type }), 
      { headers: corsHeaders }
    )

  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }), 
      { 
        status: 500,
        headers: corsHeaders 
      }
    )
  }
})