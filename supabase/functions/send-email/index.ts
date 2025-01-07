import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  templateId: string
  to: string[]
  variables?: Record<string, any>
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
    const { templateId, to, variables } = await req.json() as EmailRequest

    // Obtener la plantilla
    const { data: template, error: templateError } = await supabase
      .from('email_templates')
      .select('*')
      .eq('id', templateId)
      .single()

    if (templateError) throw new Error(`Error al obtener plantilla: ${templateError.message}`)
    if (!template) throw new Error('Plantilla no encontrada')

    // Reemplazar variables en el contenido
    let htmlContent = template.content
    let subject = template.subject

    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g')
        htmlContent = htmlContent.replace(regex, String(value))
        subject = subject.replace(regex, String(value))
      })
    }

    // Enviar email usando Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'EuroSim <noreply@eurosim.click>',
        to,
        subject,
        html: htmlContent,
      }),
    })

    const resendResponse = await res.json()

    // Registrar el envío
    const { error: logError } = await supabase
      .from('email_logs')
      .insert({
        template_id: templateId,
        recipient: to[0],
        subject,
        status: res.ok ? 'sent' : 'failed',
        error: !res.ok ? JSON.stringify(resendResponse) : null,
        metadata: {
          resend_id: resendResponse.id,
          variables
        }
      })

    if (logError) {
      console.error('Error al registrar log:', logError)
    }

    if (!res.ok) {
      throw new Error(`Error al enviar email: ${JSON.stringify(resendResponse)}`)
    }

    return new Response(JSON.stringify(resendResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error en send-email:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})