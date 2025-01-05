import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { customerInfo, orderInfo, shippingAddress } = await req.json()
    
    console.log('Creating pending order:', {
      customerInfo,
      orderInfo,
      shippingAddress
    })

    // Crear cliente Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Calcular fecha de expiración (24 horas desde ahora)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    // Insertar orden pendiente
    const { data, error } = await supabase
      .from('pending_orders')
      .insert({
        shipping_address: shippingAddress,
        customer_info: customerInfo,
        order_info: orderInfo,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single()

    if (error) throw error

    console.log('Pending order created:', data)

    return new Response(
      JSON.stringify({ id: data.id }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error creating pending order:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})