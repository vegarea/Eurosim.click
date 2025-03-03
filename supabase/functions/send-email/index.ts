
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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
    const { templateId, to, variables, isTest, subject, html } = await req.json() as EmailRequest

    let emailContent: { subject: string; html: string; cc?: string[] }

    // Modo directo o de prueba (sin plantilla)
    if (isTest || (subject && html)) {
      if (!subject || !html) {
        throw new Error('Subject y html son requeridos para emails directos o de prueba')
      }
      emailContent = { subject, html }
    } 
    // Modo plantilla (con templateId)
    else {
      if (!templateId) {
        throw new Error('templateId es requerido para emails normales')
      }

      console.log('Buscando plantilla con ID:', templateId)

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

      let processedHtml = template.content
      let processedSubject = template.subject

      // Asegurarnos de que el logo use una URL absoluta y que sea la correcta
      const absoluteLogoUrl = logoUrl.startsWith('http') 
        ? logoUrl 
        : `https://eurosim.click${logoUrl}`

      // Reemplazar cualquier URL de logo existente con la URL absoluta
      processedHtml = processedHtml.replace(
        /<img[^>]*src="[^"]*"[^>]*alt="[^"]*Logo[^"]*"[^>]*>/i,
        `<img src="${absoluteLogoUrl}" alt="Euro Connect" style="max-width: 200px; height: auto;">`
      )

      // Si es una respuesta de contacto, agregar el mensaje original y la respuesta
      if (variables?.mensaje_original && variables?.respuesta) {
        const contactResponseSection = `
          <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Tu mensaje:</h3>
            <p style="color: #666; font-style: italic; margin-bottom: 20px; padding: 10px; background-color: #fff; border-left: 4px solid #ddd; border-radius: 4px;">
              ${variables.mensaje_original}
            </p>
            
            <h3 style="color: #333;">Nuestra respuesta:</h3>
            <p style="color: #333; margin-bottom: 0; padding: 10px; background-color: #fff; border-left: 4px solid #4CAF50; border-radius: 4px;">
              ${variables.respuesta}
            </p>
          </div>
        `;
        
        // Insertar la sección de respuesta antes del cierre del cuerpo principal
        processedHtml = processedHtml.replace(
          /(<\/main>|<\/body>)/i,
          `${contactResponseSection}$1`
        );
      }

      // Procesar todas las variables en la plantilla
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

    if (!isTest && templateId) {
      const { error: logError } = await supabase
        .from('email_logs')
        .insert({
          template_id: templateId,
          recipient: to[0],
          subject: emailContent.subject,
          status: res.ok ? 'delivered' : 'failed',
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
