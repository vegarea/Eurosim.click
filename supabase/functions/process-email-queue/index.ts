import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailQueueItem {
  id: string
  order_id: string
  template_id: string | null
  status: 'pending' | 'processing' | 'sent' | 'failed'
  metadata: {
    order_type: 'physical' | 'esim'
    order_status: string
    customer_id: string
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Iniciando procesamiento de cola de emails')
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    // Obtener emails pendientes
    const { data: pendingEmails, error: queueError } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(10)

    if (queueError) {
      throw queueError
    }

    console.log(`Encontrados ${pendingEmails?.length || 0} emails pendientes`)

    if (!pendingEmails || pendingEmails.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No hay emails pendientes' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const results = await Promise.all(
      pendingEmails.map(async (email: EmailQueueItem) => {
        try {
          console.log(`Procesando email para orden ${email.order_id}`)

          // Marcar como procesando
          await supabase
            .from('email_queue')
            .update({ status: 'processing' })
            .eq('id', email.id)

          // Obtener datos necesarios
          const [orderData, templateData] = await Promise.all([
            supabase
              .from('orders')
              .select('*, customer:customers(*)')
              .eq('id', email.order_id)
              .single(),
            email.template_id
              ? supabase
                  .from('email_templates')
                  .select('*')
                  .eq('id', email.template_id)
                  .single()
              : null
          ])

          if (orderData.error) throw orderData.error
          const order = orderData.data
          const template = templateData?.data

          if (!order.customer?.email) {
            throw new Error('No se encontró email del cliente')
          }

          // Preparar contenido del email
          let subject = template?.subject || 'Actualización de tu pedido'
          let html = template?.content || `
            <h1>Actualización de tu pedido</h1>
            <p>Tu pedido ${order.id} ha sido actualizado.</p>
          `

          // Reemplazar variables en la plantilla
          const variables = {
            order_id: order.id,
            customer_name: order.customer.name,
            order_status: order.status,
            // ... más variables según necesites
          }

          Object.entries(variables).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g')
            subject = subject.replace(regex, String(value))
            html = html.replace(regex, String(value))
          })

          // Enviar email usando Resend
          const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: 'EuroSim <noreply@eurosim.click>',
              to: [order.customer.email],
              subject,
              html,
            }),
          })

          const resendData = await resendResponse.json()

          if (!resendResponse.ok) {
            throw new Error(JSON.stringify(resendData))
          }

          // Registrar el envío exitoso
          await Promise.all([
            // Actualizar estado en la cola
            supabase
              .from('email_queue')
              .update({
                status: 'sent',
                processed_at: new Date().toISOString(),
              })
              .eq('id', email.id),

            // Crear log del email
            supabase
              .from('email_logs')
              .insert({
                template_id: email.template_id,
                recipient: order.customer.email,
                subject,
                status: 'sent',
                metadata: {
                  resend_id: resendData.id,
                  order_id: order.id,
                  variables
                }
              })
          ])

          return {
            success: true,
            email_id: email.id,
            resend_id: resendData.id
          }

        } catch (error) {
          console.error(`Error procesando email ${email.id}:`, error)

          // Actualizar estado en caso de error
          await supabase
            .from('email_queue')
            .update({
              status: 'failed',
              error: error.message,
              retry_count: email.retry_count + 1,
              next_retry_at: new Date(Date.now() + 1800000).toISOString(), // 30 minutos
              processed_at: new Date().toISOString()
            })
            .eq('id', email.id)

          return {
            success: false,
            email_id: email.id,
            error: error.message
          }
        }
      })
    )

    return new Response(
      JSON.stringify({ processed: results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error general:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})