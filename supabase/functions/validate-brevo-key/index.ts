import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const { api_key } = await req.json()
    
    // Validar el formato básico
    if (!api_key || typeof api_key !== 'string' || api_key.length < 32) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Validar con la API de Brevo
    const response = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'api-key': api_key,
        'accept': 'application/json'
      }
    })

    const isValid = response.ok

    // Si es válida, guardar en la base de datos
    if (isValid) {
      const supabaseAdmin = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      const { error: insertError } = await supabaseAdmin
        .from('api_configurations')
        .insert({
          service: 'brevo',
          api_key: api_key,
          is_active: true,
          created_by: (await req.json()).user_id
        })

      if (insertError) {
        console.error('Error saving API key:', insertError)
        return new Response(
          JSON.stringify({ error: 'Error saving API key' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }
    }

    return new Response(
      JSON.stringify({ isValid }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})