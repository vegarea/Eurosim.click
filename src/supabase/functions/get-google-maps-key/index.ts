import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY')

  if (!GOOGLE_MAPS_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Google Maps API key not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ GOOGLE_MAPS_API_KEY }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})