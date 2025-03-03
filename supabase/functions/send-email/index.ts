
// Follow this setup guide to integrate the Deno SDK: https://deno.land/manual/getting_started
// Import required dependencies
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Resend } from "npm:resend@1.0.0";

// Initialize Resend with API key from environment variable
const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

// Initialize Supabase client with URL and key from environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const supabase = createClient(supabaseUrl, supabaseKey);

// Set up CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Recibida solicitud en send-email");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log("Datos recibidos:", JSON.stringify(requestData));

    // Check if this is a simple email (with HTML directly provided)
    if (requestData.html) {
      console.log("Enviando email simple con HTML proporcionado");
      
      const { to, subject, html, from } = requestData;
      
      if (!to || !to.length) {
        throw new Error("El destinatario (to) es requerido");
      }
      
      const fromEmail = from || "EuroSim <noreply@eurosim.com>";
      
      const data = await resend.emails.send({
        from: fromEmail,
        to: to,
        subject: subject || "Mensaje de EuroSim",
        html: html,
      });
      
      console.log("Email enviado con éxito:", data);
      
      // Log the email in the database
      await supabase.from("email_logs").insert({
        recipient: to.join(", "),
        subject: subject,
        status: "sent",
        email_type: "contact_response"
      });
      
      return new Response(JSON.stringify({ success: true, data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } 
    // Si se proporciona templateId, usar el flujo existente para plantillas
    else if (requestData.templateId) {
      console.log("Usando plantilla con ID:", requestData.templateId);
      
      const { data: templateData, error: templateError } = await supabase
        .from("email_templates")
        .select("*")
        .eq("id", requestData.templateId)
        .single();

      if (templateError) {
        throw new Error(`Error al obtener la plantilla: ${templateError.message}`);
      }

      if (!templateData) {
        throw new Error(`No se encontró la plantilla con ID: ${requestData.templateId}`);
      }

      const { to, variables } = requestData;

      if (!to || !to.length) {
        throw new Error("El destinatario (to) es requerido");
      }

      const subject = templateData.subject;
      let html = templateData.html_content;

      // Replace variables in the HTML content
      if (variables) {
        for (const key in variables) {
          const regex = new RegExp(`{{${key}}}`, "g");
          html = html.replace(regex, variables[key]);
        }
      }

      const data = await resend.emails.send({
        from: "EuroSim <noreply@eurosim.com>",
        to: to,
        subject: subject,
        html: html,
      });

      // Log the email in the database
      await supabase.from("email_logs").insert({
        template_id: requestData.templateId,
        recipient: to.join(", "),
        subject: subject,
        status: "sent",
      });
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
    else {
      throw new Error("Se requiere HTML o templateId para enviar el email");
    }
  } catch (error) {
    console.error("Error en send-email function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Error desconocido al enviar email",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
