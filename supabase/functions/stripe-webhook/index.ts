import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

console.log('Webhook function loaded')

serve(async (req) => {
  // Log every incoming request
  console.log('Request received:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries())
  })

  // Handle CORS
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request')
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Log all environment variables (except sensitive values)
    console.log('Environment check:', {
      hasStripeSecret: !!Deno.env.get('STRIPE_SECRET_KEY'),
      hasWebhookSecret: !!Deno.env.get('STRIPE_WEBHOOK_SECRET'),
      hasSupabaseUrl: !!Deno.env.get('SUPABASE_URL'),
      hasSupabaseKey: !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    })

    // Get the signature
    const signature = req.headers.get('stripe-signature')
    console.log('Stripe signature:', signature ? 'Present' : 'Missing')

    // Get raw body
    const rawBody = await req.text()
    console.log('Request body length:', rawBody.length)
    console.log('Request body preview:', rawBody.substring(0, 100))

    // Basic response for testing
    return new Response(
      JSON.stringify({
        received: true,
        message: 'Webhook received',
        signaturePresent: !!signature,
        bodyLength: rawBody.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Error in webhook:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})