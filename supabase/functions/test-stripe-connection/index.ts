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
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    console.log('Intentando conectar con Stripe...')
    
    // Intentar listar productos (operación simple)
    const products = await stripe.products.list({
      limit: 1,
    })

    console.log('Conexión exitosa con Stripe')
    console.log('Primer producto encontrado:', products.data[0]?.id || 'No hay productos')

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
    console.error('Error conectando con Stripe:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})