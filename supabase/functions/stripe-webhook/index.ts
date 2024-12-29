import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return new Response('No signature', { status: 400 })
    }

    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (!webhookSecret) {
      console.error('Missing STRIPE_WEBHOOK_SECRET!')
      return new Response('Webhook secret not configured', { status: 500 })
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      )
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    console.log(`Event received: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        
        // Actualizar el estado del pedido a processing
        const { error } = await supabaseClient
          .from('orders')
          .update({ 
            status: 'processing',
            payment_status: 'completed',
            stripe_payment_intent_id: session.payment_intent,
            stripe_receipt_url: session.receipt_url,
            metadata: {
              ...session.metadata,
              stripe_session_id: session.id
            }
          })
          .eq('id', session.metadata.orderId)

        if (error) {
          console.error('Error updating order:', error)
          return new Response('Error updating order', { status: 500 })
        }

        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object
        
        // Actualizar el estado del pedido a cancelled
        const { error } = await supabaseClient
          .from('orders')
          .update({ 
            status: 'cancelled',
            payment_status: 'failed',
            metadata: {
              ...session.metadata,
              stripe_session_id: session.id,
              failure_reason: 'Session expired'
            }
          })
          .eq('id', session.metadata.orderId)

        if (error) {
          console.error('Error updating order:', error)
          return new Response('Error updating order', { status: 500 })
        }

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        
        // Actualizar el estado del pedido a payment_failed
        const { error } = await supabaseClient
          .from('orders')
          .update({ 
            status: 'payment_failed',
            payment_status: 'failed',
            metadata: {
              ...paymentIntent.metadata,
              failure_reason: paymentIntent.last_payment_error?.message || 'Unknown error'
            }
          })
          .eq('id', paymentIntent.metadata.orderId)

        if (error) {
          console.error('Error updating order:', error)
          return new Response('Error updating order', { status: 500 })
        }

        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})