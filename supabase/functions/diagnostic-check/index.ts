import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    console.log('🔍 Iniciando diagnóstico...')

    // 1. Verificar trigger
    const { data: triggers, error: triggerError } = await supabase.rpc(
      'get_trigger_info',
      { trigger_name: 'trigger_order_status_change' }
    )
    
    if (triggerError) {
      console.error('❌ Error al verificar trigger:', triggerError)
    } else {
      console.log('✅ Información del trigger:', triggers)
    }

    // 2. Verificar últimos eventos
    const { data: events, error: eventsError } = await supabase
      .from('order_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (eventsError) {
      console.error('❌ Error al obtener eventos:', eventsError)
    } else {
      console.log('📋 Últimos eventos:', events)
    }

    // 3. Verificar logs de email
    const { data: emailLogs, error: logsError } = await supabase
      .from('email_logs')
      .select(`
        *,
        email_templates (
          name,
          type,
          status
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5)

    if (logsError) {
      console.error('❌ Error al obtener logs de email:', logsError)
    } else {
      console.log('📧 Últimos logs de email:', emailLogs)
    }

    // 4. Verificar últimas órdenes actualizadas
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        customer:customers (
          name,
          email
        )
      `)
      .order('updated_at', { ascending: false })
      .limit(5)

    if (ordersError) {
      console.error('❌ Error al obtener órdenes:', ordersError)
    } else {
      console.log('🛍️ Últimas órdenes:', orders)
    }

    return new Response(
      JSON.stringify({
        triggers,
        events,
        emailLogs,
        orders,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error general:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})