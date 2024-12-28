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
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY no está configurada')
      throw new Error('Stripe key no configurada')
    }

    console.log('Iniciando prueba de conexión con Stripe...')
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
    })

    console.log('Cliente Stripe inicializado, intentando listar productos...')
    
    const products = await stripe.products.list({
      limit: 1,
    })

    console.log('Conexión exitosa con Stripe')
    console.log('Productos encontrados:', products.data.length)
    if (products.data[0]) {
      console.log('ID del primer producto:', products.data[0].id)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Conexión exitosa con Stripe',
        productCount: products.data.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error detallado:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause
    })

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})