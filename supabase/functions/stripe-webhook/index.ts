import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { handleCustomerCreation } from './handlers/customerHandler.ts'
import { handleOrderCreation } from './handlers/orderHandler.ts'
import { handleOrderItemCreation } from './handlers/orderItemHandler.ts'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Content-Type': 'application/json'
}

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

serve(async (req) => {
  console.log('🔍 DEBUG: Iniciando procesamiento de webhook')
  console.log('Método:', req.method)
  console.log('Headers:', Object.fromEntries(req.headers.entries()))
  
  if (req.method === 'OPTIONS') {
    console.log('👋 Manejando preflight CORS')
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    })
  }

  try {
    const signature = req.headers.get('stripe-signature')
    
    if (!signature) {
      console.error('❌ ERROR: No se encontró stripe-signature en headers')
      return new Response(
        JSON.stringify({ error: 'No stripe-signature header' }), 
        { 
          status: 400,
          headers: corsHeaders
        }
      )
    }

    const payload = await req.text()
    console.log('📦 Payload recibido:', payload)
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      )
      console.log('✅ Firma del webhook verificada')
      console.log('🎯 Tipo de evento:', event.type)
      console.log('📝 Datos del evento:', JSON.stringify(event.data, null, 2))
    } catch (err) {
      console.error('❌ ERROR: Verificación de firma fallida:', err)
      console.error('Firma:', signature)
      console.error('Payload:', payload)
      return new Response(
        JSON.stringify({ 
          error: 'Invalid signature',
          details: err.message
        }), 
        { 
          status: 400,
          headers: corsHeaders
        }
      )
    }

    // Verificar variables de entorno de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    console.log('🔑 Variables de entorno Supabase:')
    console.log('URL presente:', !!supabaseUrl)
    console.log('Key presente:', !!supabaseKey)
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Configuración de Supabase incompleta')
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('🔌 Cliente Supabase inicializado')

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log('💳 Procesando sesión de checkout completada:')
        console.log('ID de sesión:', session.id)
        console.log('Email del cliente:', session.customer_email)
        console.log('Metadata:', session.metadata)
        
        try {
          console.log('👤 Iniciando creación/actualización de cliente...')
          const customer = await handleCustomerCreation(session, supabase)
          console.log('✅ Cliente procesado:', customer)
          
          console.log('📦 Iniciando creación de orden...')
          const order = await handleOrderCreation(session, customer, supabase)
          console.log('✅ Orden creada:', order)
          
          console.log('🛍️ Iniciando creación de items de orden...')
          const orderItems = await handleOrderItemCreation(session, order, supabase)
          console.log('✅ Items de orden creados:', orderItems)

          console.log('🎉 Procesamiento completado exitosamente')
          return new Response(
            JSON.stringify({ 
              received: true,
              session_id: session.id,
              customer_id: customer.id,
              order_id: order.id,
              order_items: orderItems
            }), 
            { 
              headers: corsHeaders,
              status: 200
            }
          )
        } catch (error) {
          console.error('❌ ERROR en el procesamiento:', error)
          console.error('Detalles del error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            details: error.details || 'Sin detalles adicionales',
            code: error.code,
            hint: error.hint
          })
          
          if (error.message.includes('Database error')) {
            console.error('Detalles del error de base de datos:', {
              code: error.code,
              message: error.message,
              details: error.details,
              hint: error.hint
            })
          }
          
          return new Response(
            JSON.stringify({ 
              error: error.message,
              details: error.stack,
              data: error.details || 'Sin detalles adicionales'
            }), 
            { 
              status: 500,
              headers: corsHeaders
            }
          )
        }
      }
      default: {
        console.log('⚠️ Tipo de evento no manejado:', event.type)
        return new Response(
          JSON.stringify({ 
            received: true,
            event_type: event.type
          }), 
          { 
            headers: corsHeaders,
            status: 200
          }
        )
      }
    }
  } catch (err) {
    console.error('❌ ERROR FATAL en el webhook:', err)
    console.error('Detalles del error:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      details: err.details || 'Sin detalles adicionales'
    })
    return new Response(
      JSON.stringify({ 
        error: err.message,
        details: err.stack,
        data: err.details || 'Sin detalles adicionales'
      }), 
      { 
        status: 400,
        headers: corsHeaders
      }
    )
  }
})