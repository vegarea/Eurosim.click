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

    const isPhysicalProduct = cartItems[0]?.metadata?.product_type === 'physical';

    // Construir metadata base
    const metadata: Record<string, string> = {
      customer_name: String(customerInfo.name),
      customer_email: String(customerInfo.email),
      customer_phone: String(customerInfo.phone),
      customer_passport: String(customerInfo.passport_number),
      customer_birth_date: String(customerInfo.birth_date),
      customer_gender: String(customerInfo.gender),
      product_id: String(cartItems[0].product_id),
      product_type: String(cartItems[0].metadata.product_type),
      activation_date: String(orderInfo.activation_date),
      total_amount: String(cartItems[0].total_price)
    }

    // Si es producto físico, agregar información de envío
    if (isPhysicalProduct && orderInfo.shipping_address) {
      Object.assign(metadata, {
        shipping_street: String(orderInfo.shipping_address.street),
        shipping_city: String(orderInfo.shipping_address.city),
        shipping_state: String(orderInfo.shipping_address.state),
        shipping_country: String(orderInfo.shipping_address.country),
        shipping_postal_code: String(orderInfo.shipping_address.postal_code),
        shipping_phone: String(orderInfo.shipping_address.phone)
      });
    }

    const sessionConfig: any = {
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
      metadata
    }

    // Agregar configuración de envío solo si es producto físico
    if (isPhysicalProduct) {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['MX']
      };
      
      sessionConfig.shipping_options = [{
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
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})