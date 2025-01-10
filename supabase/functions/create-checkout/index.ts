import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    // Crear cliente de Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Obtener información del producto, incluyendo el tipo
    const { data: product, error: productError } = await supabaseClient
      .from('products')
      .select('type, title')
      .eq('id', cartItems[0].product_id)
      .single()

    if (productError) {
      throw new Error(`Error fetching product: ${productError.message}`)
    }

    console.log('Product info:', product)

    // Obtener costo de envío si hay productos físicos
    let shippingCost = 0
    const isPhysicalProduct = product.type === 'physical'

    if (isPhysicalProduct) {
      const { data: shippingSettings } = await supabaseClient
        .from('shipping_settings')
        .select('shipping_cost')
        .eq('is_active', true)
        .single()

      if (shippingSettings) {
        shippingCost = shippingSettings.shipping_cost
        console.log('Shipping cost applied:', shippingCost)
      }
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_LIVE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const metadata: Record<string, string> = {
      customer_name: String(customerInfo.name),
      customer_email: String(customerInfo.email),
      customer_phone: String(customerInfo.phone),
      customer_passport: String(customerInfo.passport_number),
      customer_birth_date: String(customerInfo.birth_date),
      customer_gender: String(customerInfo.gender),
      product_id: String(cartItems[0].product_id),
      product_type: String(product.type),
      product_title: String(product.title),
      activation_date: String(orderInfo.activation_date),
      total_amount: String(cartItems[0].total_price),
      shipping_cost: String(shippingCost)
    }

    // Añadir información de envío si existe y es producto físico
    if (isPhysicalProduct && orderInfo.shipping_address) {
      metadata.shipping_street = String(orderInfo.shipping_address.street || '')
      metadata.shipping_city = String(orderInfo.shipping_address.city || '')
      metadata.shipping_state = String(orderInfo.shipping_address.state || '')
      metadata.shipping_country = String(orderInfo.shipping_address.country || '')
      metadata.shipping_postal_code = String(orderInfo.shipping_address.postal_code || '')
      metadata.shipping_phone = String(orderInfo.shipping_address.phone || '')
    }

    const metadataSize = JSON.stringify(metadata).length
    console.log('Metadata size:', metadataSize)
    console.log('Final metadata being sent to Stripe:', metadata)

    if (metadataSize > 4096) {
      throw new Error('Metadata exceeds Stripe limit of 4096 characters')
    }

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: product.title,
        },
        unit_amount: item.unit_price,
      },
      quantity: item.quantity,
    }))

    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: 'Costo de envío',
          },
          unit_amount: shippingCost,
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerInfo.email,
      success_url: `${req.headers.get('origin')}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata,
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