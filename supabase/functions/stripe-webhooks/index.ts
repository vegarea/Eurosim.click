import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      throw new Error('No Stripe signature found')
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured')
    }

    const body = await req.text()
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    console.log('Processing Stripe webhook event:', event.type)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log('Payment successful for session:', session.id)

        // Actualizar el estado de la orden
        const { error: orderError } = await supabase
          .from('orders')
          .update({
            status: 'processing',
            payment_status: 'completed',
            payment_method: 'stripe',
            stripe_payment_intent_id: session.payment_intent,
            stripe_receipt_url: session.receipt_url,
            metadata: {
              ...session.metadata,
              stripe_session_id: session.id
            }
          })
          .eq('id', session.metadata.orderId)

        if (orderError) {
          console.error('Error updating order:', orderError)
          throw orderError
        }

        // Crear evento de orden
        const { error: eventError } = await supabase
          .from('order_events')
          .insert({
            order_id: session.metadata.orderId,
            type: 'payment_completed',
            description: 'Pago completado exitosamente',
            metadata: {
              stripe_session_id: session.id,
              payment_intent: session.payment_intent
            }
          })

        if (eventError) {
          console.error('Error creating order event:', eventError)
          throw eventError
        }

        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object
        console.log('Payment session expired:', session.id)

        const { error: orderError } = await supabase
          .from('orders')
          .update({
            status: 'payment_failed',
            payment_status: 'failed',
            metadata: {
              ...session.metadata,
              stripe_session_id: session.id,
              failure_reason: 'Session expired'
            }
          })
          .eq('id', session.metadata.orderId)

        if (orderError) {
          console.error('Error updating order:', orderError)
          throw orderError
        }

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        console.log('Payment failed for intent:', paymentIntent.id)

        const { error: orderError } = await supabase
          .from('orders')
          .update({
            status: 'payment_failed',
            payment_status: 'failed',
            metadata: {
              stripe_payment_intent_id: paymentIntent.id,
              failure_reason: paymentIntent.last_payment_error?.message || 'Unknown error'
            }
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        if (orderError) {
          console.error('Error updating order:', orderError)
          throw orderError
        }

        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})