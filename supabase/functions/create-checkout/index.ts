import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'

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
    const { amount, currency, description } = await req.json()
    console.log('Creando sesión de prueba:', { amount, currency, description })

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Crear sesión de checkout simple
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Prueba de Stripe',
              description: description,
            },
            unit_amount: amount, // en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout`,
    })

    console.log('Sesión de checkout creada:', {
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
    console.error('Error creando sesión de checkout:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})