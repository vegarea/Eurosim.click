
import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"
import { supabaseAdmin } from "../_shared/supabaseClient.ts"

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, message } = await req.json()
    
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          error: "Se requieren todos los campos: nombre, email y mensaje" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      )
    }

    // Guardar el mensaje en la base de datos
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          message,
          status: 'nuevo',
          is_archived: false
        }
      ])
      .select()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    )
  }
})
