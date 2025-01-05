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

    // Formatear fechas a ISO 8601
    const formattedBirthDate = new Date(customerInfo.birth_date).toISOString().split('T')[0];
    const formattedActivationDate = orderInfo.activation_date ? 
      new Date(orderInfo.activation_date).toISOString() : null;

    // Preparar los metadatos para Stripe, incluyendo la dirección de envío
    const metadata = {
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      customer_passport: customerInfo.passport_number,
      customer_birth_date: formattedBirthDate,
      customer_gender: customerInfo.gender,
      order_type: cartItems[0].metadata.product_type,
      product_id: cartItems[0].product_id,
      activation_date: formattedActivationDate,
      total_amount: cartItems.reduce((sum: number, item: any) => 
        sum + (item.unit_price * item.quantity), 0
      ).toString(),
      // Agregar dirección de envío a los metadatos
      shipping_street: customerInfo.default_shipping_address?.street || '',
      shipping_city: customerInfo.default_shipping_address?.city || '',
      shipping_state: customerInfo.default_shipping_address?.state || '',
      shipping_postal_code: customerInfo.default_shipping_address?.postal_code || '',
      shipping_country: customerInfo.default_shipping_address?.country || 'MX',
      shipping_phone: customerInfo.default_shipping_address?.phone || customerInfo.phone || '',
    }

    console.log('Session metadata:', metadata)

    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customerInfo.email,
      success_url: `${req.headers.get('origin')}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata,
      shipping_address_collection: orderInfo.type === 'physical' ? {
        allowed_countries: ['MX']
      } : undefined
    }

    console.log('Creating session with config:', sessionConfig)

    const session = await stripe.checkout.sessions.create(sessionConfig)

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