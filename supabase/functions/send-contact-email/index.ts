
// Función edge para procesar los emails de contacto y guardarlos en la base de datos
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { name, email, message }: ContactEmailRequest = await req.json();

    if (!name || !email || !message) {
      throw new Error("Los campos nombre, email y mensaje son obligatorios");
    }

    // Guardar el mensaje en la base de datos
    const { data: savedMessage, error: dbError } = await supabase
      .from('contact_messages')
      .insert([
        { name, email, message }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Error al guardar el mensaje en la base de datos:', dbError);
      throw dbError;
    }

    console.log('Mensaje guardado en la base de datos:', savedMessage);

    // Enviar el mensaje por email usando la función send-email
    const { data: emailResponse, error: emailError } = await supabase.functions.invoke('send-email', {
      body: {
        to: ["admin@eurosim.com"], // Reemplazar con el email del administrador
        subject: `Nuevo mensaje de contacto de ${name}`,
        isContact: true,
        html: `
          <h1>Nuevo mensaje de contacto</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `
      }
    });

    if (emailError) {
      console.error('Error al enviar el email:', emailError);
      throw emailError;
    }

    console.log('Email enviado correctamente:', emailResponse);
    
    return new Response(
      JSON.stringify({ success: true, message: 'Mensaje enviado correctamente' }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  } catch (error: any) {
    console.error("Error en la función send-contact-email:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Error al procesar la solicitud" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
