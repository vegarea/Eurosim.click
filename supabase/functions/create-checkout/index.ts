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
    
    console.log('Received checkout request:', { cartItems, customerInfo, orderInfo })

    // Validar datos requeridos del cliente
    const requiredFields = ['name', 'email', 'phone', 'passport_number', 'birth_date', 'gender'];
    const missingFields = requiredFields.filter(field => !customerInfo[field]);

    if (missingFields.length > 0) {
      throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }

    if (cartItems.length === 0) {
      throw new Error('El carrito está vacío');
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Crear line items desde el carrito
    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.metadata?.product_title || 'Producto',
          description: item.metadata?.description,
        },
        unit_amount: item.unit_price,
      },
      quantity: item.quantity,
    }))

    console.log('Creating checkout session with items:', line_items)

    // Preparar los metadatos con nombres consistentes
    const metadata = {
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      customer_passport: customerInfo.passport_number,
      customer_birth_date: customerInfo.birth_date,
      customer_gender: customerInfo.gender,
      order_type: cartItems[0].metadata.product_type,
      product_id: cartItems[0].product_id,
      shipping_address: JSON.stringify(customerInfo.shipping_address || {}),
      total_amount: cartItems.reduce((sum: number, item: any) => sum + (item.unit_price * item.quantity), 0),
    }

    console.log('Session metadata:', metadata)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customerInfo.email,
      success_url: `${req.headers.get('origin')}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata,
    })

    console.log('Checkout session created:', session.id)

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