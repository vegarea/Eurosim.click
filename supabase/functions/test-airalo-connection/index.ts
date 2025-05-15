
// Follow this setup guide to integrate the Deno SDK: https://deno.land/manual/getting_started
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { apiKey, apiSecret, apiUrl } = await req.json();

    if (!apiKey || !apiSecret) {
      return new Response(
        JSON.stringify({ success: false, error: "API Key y Secret son requeridos" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Inicializar cliente de Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Aquí intentamos conectar con la API de Airalo (simulado)
    // En una implementación real, haríamos una solicitud a la API de Airalo
    console.log(`Intentando conectar con Airalo API: ${apiUrl}`);
    console.log(`Usando credenciales: ${apiKey.substring(0, 4)}...`);

    // Simular verificación de credenciales
    // En la implementación real, aquí haríamos una solicitud de prueba a la API de Airalo
    const isValidCredentials = apiKey.length > 8 && apiSecret.length > 8;

    if (!isValidCredentials) {
      return new Response(
        JSON.stringify({ success: false, error: "Credenciales inválidas" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Si llegamos aquí, la conexión fue exitosa
    console.log("Conexión exitosa con API de Airalo (simulada)");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Conexión exitosa con la API de Airalo",
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error en test-airalo-connection:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Error desconocido al probar conexión",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
