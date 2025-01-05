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
    
    console.group('create-checkout - Request Data')
    console.log('Cart Items:', cartItems)
    console.log('Customer Info:', customerInfo)
    console.log('Order Info:', orderInfo)
    console.log('Shipping Address:', customerInfo.default_shipping_address)
    console.groupEnd()

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

    // Formatear fechas a ISO 8601
    const formattedBirthDate = new Date(customerInfo.birth_date).toISOString().split('T')[0];
    const formattedActivationDate = orderInfo.activation_date ? 
      new Date(orderInfo.activation_date).toISOString() : null;

    const shippingAddress = customerInfo.default_shipping_address || {};
    
    // Incluir la dirección de envío en la metadata
    const metadata: Record<string, string> = {
      customer_name: String(customerInfo.name || ''),
      customer_email: String(customerInfo.email || ''),
      customer_phone: String(customerInfo.phone || ''),
      customer_passport: String(customerInfo.passport_number || ''),
      customer_birth_date: String(formattedBirthDate || ''),
      customer_gender: String(customerInfo.gender || ''),
      order_type: String(cartItems[0]?.metadata?.product_type || ''),
      product_id: String(cartItems[0]?.product_id || ''),
      activation_date: String(formattedActivationDate || ''),
      total_amount: String(cartItems.reduce((sum: number, item: any) => 
        sum + (item.unit_price * item.quantity), 0
      )),
      shipping_street: String(shippingAddress.street || ''),
      shipping_city: String(shippingAddress.city || ''),
      shipping_state: String(shippingAddress.state || ''),
      shipping_postal_code: String(shippingAddress.postal_code || ''),
      shipping_country: String(shippingAddress.country || ''),
      shipping_phone: String(shippingAddress.phone || customerInfo.phone || '')
    };

    console.log('create-checkout - Metadatos preparados:', metadata)

    const sessionConfig: any = {
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customerInfo.email,
      success_url: `${req.headers.get('origin')}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata,
      shipping_address_collection: cartItems[0]?.metadata?.product_type === 'physical' ? {
        allowed_countries: ['MX']
      } : undefined,
      shipping_options: cartItems[0]?.metadata?.product_type === 'physical' ? [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'mxn',
            },
            display_name: 'Envío Gratis',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ] : undefined
    }

    console.log('create-checkout - Configuración de sesión:', sessionConfig)

    const session = await stripe.checkout.sessions.create(sessionConfig)

    console.log('create-checkout - Sesión creada:', {
      id: session.id,
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
    console.error('create-checkout - Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})