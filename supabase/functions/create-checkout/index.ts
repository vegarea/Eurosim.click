import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { productId, customerId } = await req.json()
    console.log('Creating checkout session for:', { productId, customerId })

    // Inicializar clientes
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Obtener información del producto
    const { data: product, error: productError } = await supabaseClient
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      console.error('Product not found:', productError)
      throw new Error('Producto no encontrado')
    }

    console.log('Product found:', product)

    // Obtener información del cliente
    const { data: customer, error: customerError } = await supabaseClient
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single()

    if (customerError || !customer) {
      console.error('Customer not found:', customerError)
      throw new Error('Cliente no encontrado')
    }

    console.log('Customer found:', customer)

    // Crear orden en la base de datos
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        customer_id: customerId,
        product_id: productId,
        type: product.type,
        total_amount: product.price,
        quantity: 1,
        payment_method: 'stripe',
        payment_status: 'pending',
        status: 'payment_pending'
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('Error creating order:', orderError)
      throw new Error('Error al crear la orden')
    }

    console.log('Order created:', order)

    // Crear sesión de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: product.title,
              description: product.description || undefined,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      customer_email: customer.email,
      metadata: {
        orderId: order.id,
        productId: product.id,
        customerId: customer.id,
        productType: product.type,
      },
    })

    console.log('Checkout session created:', {
      sessionId: session.id,
      url: session.url
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