import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { page = 1, limit = 8 } = await req.json();
    console.log("📧 Fetching Resend logs with params:", { page, limit });

    const res = await fetch("https://api.resend.com/emails", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error from Resend:", errorText);
      throw new Error(`Error from Resend: ${errorText}`);
    }

    const data = await res.json();
    console.log(`✅ Retrieved ${data.data.length} emails from Resend`);
    
    // Calcular el inicio y fin para la paginación
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return new Response(
      JSON.stringify({
        data: data.data.slice(start, end),
        total: data.data.length,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("❌ Error fetching Resend logs:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);