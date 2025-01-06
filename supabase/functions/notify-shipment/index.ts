import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface EmailRequest {
  orderId: string
  trackingNumber: string
  carrier: string
  customerEmail?: string
  customerName?: string
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderId, trackingNumber, carrier, customerEmail, customerName } = await req.json() as EmailRequest

    // Enviar email al cliente si tenemos su información
    if (customerEmail) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Tu Empresa <no-reply@tuempresa.com>",
          to: [customerEmail],
          subject: "Tu pedido está en camino",
          html: `
            <h1>¡Tu pedido está en camino!</h1>
            <p>Hola ${customerName || ''},</p>
            <p>Tu pedido #${orderId.substring(0,8)} ha sido enviado.</p>
            <p>Detalles del envío:</p>
            <ul>
              <li>Número de seguimiento: ${trackingNumber}</li>
              <li>Empresa de envío: ${carrier}</li>
            </ul>
          `
        }),
      })
    }

    // Enviar notificación al admin
    if (ADMIN_EMAIL) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Sistema <no-reply@tuempresa.com>",
          to: [ADMIN_EMAIL],
          subject: `Pedido #${orderId.substring(0,8)} enviado`,
          html: `
            <h1>Pedido enviado</h1>
            <p>El pedido #${orderId.substring(0,8)} ha sido enviado.</p>
            <p>Detalles:</p>
            <ul>
              <li>Cliente: ${customerName || 'No registrado'}</li>
              <li>Email: ${customerEmail || 'No disponible'}</li>
              <li>Tracking: ${trackingNumber}</li>
              <li>Carrier: ${carrier}</li>
            </ul>
          `
        }),
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})