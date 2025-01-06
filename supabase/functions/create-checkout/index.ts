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
    const { cartItems, customerInfo, orderInfo } = await req.json()
    
    console.log('Received checkout request:', {
      cartItems,
      customerInfo,
      orderInfo
    })

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Verificar si hay dirección de envío
    console.log('Shipping address from orderInfo:', orderInfo.shipping_address)

    const metadata: Record<string, string> = {
      customer_name: String(customerInfo.name),
      customer_email: String(customerInfo.email),
      customer_phone: String(customerInfo.phone),
      customer_passport: String(customerInfo.passport_number),
      customer_birth_date: String(customerInfo.birth_date),
      customer_gender: String(customerInfo.gender),
      product_id: String(cartItems[0].product_id),
      activation_date: String(orderInfo.activation_date),
      total_amount: String(cartItems[0].total_price),
      shipping_street: String(orderInfo.shipping_address?.street || ''),
      shipping_city: String(orderInfo.shipping_address?.city || ''),
      shipping_state: String(orderInfo.shipping_address?.state || ''),
      shipping_country: String(orderInfo.shipping_address?.country || ''),
      shipping_postal_code: String(orderInfo.shipping_address?.postal_code || ''),
      shipping_phone: String(orderInfo.shipping_address?.phone || '')
    }

    // Verificar el tamaño de la metadata
    const metadataSize = JSON.stringify(metadata).length
    console.log('Metadata size:', metadataSize)
    console.log('Final metadata being sent to Stripe:', metadata)

    if (metadataSize > 4096) {
      throw new Error('Metadata exceeds Stripe limit of 4096 characters')
    }

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
      // Removemos shipping_address_collection para que no solicite dirección
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