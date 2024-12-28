import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { products, customerData, metadata } = await req.json()

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    console.log('Creating checkout session with data:', { products, customerData, metadata })

    // Crear o actualizar cliente en Stripe
    let stripeCustomer;
    const existingCustomers = await stripe.customers.list({
      email: customerData.email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      stripeCustomer = existingCustomers.data[0];
      // Actualizar cliente existente
      await stripe.customers.update(stripeCustomer.id, {
        name: customerData.name,
        phone: customerData.phone,
      });
    } else {
      // Crear nuevo cliente
      stripeCustomer = await stripe.customers.create({
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
      });
    }

    console.log('Stripe customer:', stripeCustomer.id)

    // Crear line items
    const line_items = products.map((product: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.title,
          description: product.description,
          metadata: {
            product_id: product.id,
            type: product.type
          }
        },
        unit_amount: product.price, // Price should be in cents
      },
      quantity: product.quantity,
    }))

    console.log('Creating session with line items:', line_items)

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
      metadata: {
        ...metadata,
        customer_id: stripeCustomer.id
      },
      customer_email: customerData.email,
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