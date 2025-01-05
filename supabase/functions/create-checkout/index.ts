import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { cartItems, customerInfo, orderInfo, pendingOrderId } = await req.json()
    
    console.log('Received checkout request:', {
      cartItems,
      customerInfo,
      orderInfo,
      pendingOrderId
    })

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Metadata básica que sabemos que cabe en los límites de Stripe
    const metadata = {
      customer_name: String(customerInfo.name),
      customer_email: String(customerInfo.email),
      pending_order_id: pendingOrderId, // Aquí guardamos el ID de la orden pendiente
      product_id: String(cartItems[0].product_id),
      total_amount: String(cartItems[0].total_price)
    }

    const metadataSize = JSON.stringify(metadata).length
    console.log('Metadata size:', metadataSize)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.metadata.product_title,
          },
          unit_amount: item.unit_price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      customer_email: customerInfo.email,
      success_url: `${req.headers.get('origin')}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata,
      shipping_address_collection: cartItems[0].metadata.product_type === 'physical' ? {
        allowed_countries: ['MX'],
      } : undefined,
    })

    console.log('Stripe session created:', {
      sessionId: session.id,
      metadata: session.metadata
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})