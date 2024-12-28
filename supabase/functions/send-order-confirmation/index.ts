import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderConfirmationRequest {
  email: string;
  orderId: string;
  customerName: string;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, orderId, customerName }: OrderConfirmationRequest = await req.json();

    // Crear cliente de Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Generar magic link
    const { data: { signInUrl }, error: signInError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        redirectTo: `${req.headers.get("origin")}/orders/${orderId}`,
      },
    });

    if (signInError) {
      throw new Error(`Error generating magic link: ${signInError.message}`);
    }

    // Enviar email con Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TuEmpresa <onboarding@resend.dev>",
        to: [email],
        subject: "¡Gracias por tu compra!",
        html: `
          <h1>¡Gracias por tu compra, ${customerName}!</h1>
          <p>Tu pedido #${orderId} ha sido confirmado.</p>
          <p>Para ver los detalles de tu pedido y acceder a tu cuenta, haz clic en el siguiente enlace:</p>
          <a href="${signInUrl}" style="display: inline-block; background-color: #7E69AB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Ver mi pedido</a>
          <p>Este enlace es válido por 24 horas.</p>
          <p>Si no creaste esta cuenta, puedes ignorar este email.</p>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Error sending email: ${error}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);