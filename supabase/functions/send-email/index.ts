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
  templateId?: string
  to: string[]
  variables?: Record<string, any>
  isTest?: boolean
  subject?: string
  html?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
    const { templateId, to, variables, isTest, subject, html } = await req.json() as EmailRequest

    let emailContent: { subject: string; html: string; cc?: string[] }

    // Si es un email de prueba, usar el contenido proporcionado directamente
    if (isTest) {
      if (!subject || !html) {
        throw new Error('Subject y html son requeridos para emails de prueba')
      }
      emailContent = { subject, html }
    } else {
      // Si no es de prueba, obtener la plantilla
      if (!templateId) {
        throw new Error('templateId es requerido para emails normales')
      }

      console.log('Buscando plantilla con ID:', templateId)

      // Primero obtener la URL del logo desde site_settings
      const { data: siteSettings } = await supabase
        .from('site_settings')
        .select('logo_url')
        .single()

      const logoUrl = siteSettings?.logo_url || '/logo.png'

      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('id', templateId)
        .eq('is_active', true)
        .maybeSingle()

      if (templateError) {
        console.error('Error al obtener plantilla:', templateError)
        throw new Error(`Error al obtener plantilla: ${templateError.message}`)
      }
      
      if (!template) {
        console.error('No se encontró la plantilla activa con ID:', templateId)
        throw new Error('No se encontró una plantilla activa con el ID proporcionado')
      }

      // Reemplazar variables en el contenido
      let processedHtml = template.content
      let processedSubject = template.subject

      // Asegurarnos de que el logo use una URL absoluta
      const absoluteLogoUrl = logoUrl.startsWith('http') ? logoUrl : `https://eurosim.click${logoUrl}`
      processedHtml = processedHtml.replace(/src="[^"]*website\.png"/, `src="${absoluteLogoUrl}"`)

      // Determinar el mensaje según el tipo de producto
      const isEsim = variables?.type === 'esim'
      const importantMessage = isEsim
        ? "Tu compra ha sido procesada correctamente y recibirás tu código QR un día antes de tu fecha de activación con los pasos simples para que instales tu eSIM."
        : "Tu SIM está procesando y recibirás un email con tu número de seguimiento en las próximas 48 hrs."

      // Reemplazar el mensaje en el HTML con estilo destacado
      processedHtml = processedHtml.replace(
        /<p style="color: #666;">(Tu compra ha sido procesada.*?|Tu SIM está procesando.*?)<\/p>/,
        `<p style="color: #1a1f2c; font-size: 18px; font-weight: bold; background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">${importantMessage}</p>`
      )

      if (variables) {
        Object.entries(variables).forEach(([key, value]) => {
          const regex = new RegExp(`{${key}}`, 'g')
          processedHtml = processedHtml.replace(regex, String(value))
          processedSubject = processedSubject.replace(regex, String(value))
        })
      }

      emailContent = {
        subject: processedSubject,
        html: processedHtml,
        cc: Array.isArray(template.cc_emails) ? template.cc_emails : []
      }
    }

    console.log('Enviando email a:', to)

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
        cc: emailContent.cc,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    })

    const resendResponse = await res.json()

    if (!res.ok) {
      console.error('Error de Resend:', resendResponse)
      throw new Error(`Error al enviar email: ${JSON.stringify(resendResponse)}`)
    }

    // Registrar el envío solo si no es una prueba
    if (!isTest && templateId) {
      const { error: logError } = await supabase
        .from('email_logs')
        .insert({
          template_id: templateId,
          recipient: to[0],
          subject: emailContent.subject,
          status: res.ok ? 'sent' : 'failed',
          error: !res.ok ? JSON.stringify(resendResponse) : null,
          cc_emails: emailContent.cc,
          metadata: {
            resend_id: resendResponse.id,
            variables
          }
        })

      if (logError) {
        console.error('Error al registrar log:', logError)
      }
    }

    return new Response(JSON.stringify(resendResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error('Error en send-email function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})