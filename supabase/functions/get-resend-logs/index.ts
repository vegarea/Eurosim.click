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

    const res = await fetch("https://api.resend.com/emails", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error from Resend: ${await res.text()}`);
    }

    const data = await res.json();
    
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
    console.error("Error fetching Resend logs:", error);
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