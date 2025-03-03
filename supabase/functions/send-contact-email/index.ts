
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

serve(async (req) => {
  // Manejar preflight CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json() as ContactFormData;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son requeridos" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Guardar mensaje en la base de datos
    const { error: dbError } = await supabaseClient
      .from('contact_messages')
      .insert({
        name,
        email,
        message,
        status: 'nuevo'
      });

    if (dbError) {
      console.error("Error al guardar mensaje:", dbError);
      return new Response(
        JSON.stringify({ error: "Error al guardar el mensaje" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Aquí puedes añadir lógica para enviar email de notificación si es necesario

    return new Response(
      JSON.stringify({ success: true, message: "Mensaje enviado correctamente" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error en el servidor" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
