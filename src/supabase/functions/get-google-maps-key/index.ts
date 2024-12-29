import { serve } from "https://deno.land/std@0.177.0/http/server.ts"

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
    console.log("Iniciando función get-google-maps-key")
    
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY')
    console.log("Estado de la API key:", GOOGLE_MAPS_API_KEY ? "Existe" : "No existe")

    if (!GOOGLE_MAPS_API_KEY) {
      console.error("API key de Google Maps no configurada")
      return new Response(
        JSON.stringify({ error: 'API key de Google Maps no configurada' }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      )
    }

    return new Response(
      JSON.stringify({ GOOGLE_MAPS_API_KEY }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )
  } catch (error) {
    console.error("Error en la función get-google-maps-key:", error)
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )
  }
})