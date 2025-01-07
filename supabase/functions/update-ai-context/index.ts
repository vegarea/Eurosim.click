import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Fetch active products
    const { data: products, error: productsError } = await supabaseClient
      .from('products')
      .select('*')
      .eq('status', 'active')
    
    if (productsError) throw productsError

    // Format eSIM products information
    const esimProducts = products
      .filter(p => p.type === 'esim')
      .map(p => `- Plan ${p.title}: ${p.data_eu_gb}GB en Europa y ${p.data_es_gb}GB en España por ${(p.price/100).toFixed(2)}€`)
      .join('\n')

    // Format physical SIM products information
    const physicalProducts = products
      .filter(p => p.type === 'physical')
      .map(p => `- ${p.title}: ${p.data_eu_gb}GB en Europa y ${p.data_es_gb}GB en España por ${(p.price/100).toFixed(2)}€`)
      .join('\n')

    // Create the context-aware system prompt
    const systemPrompt = `Eres un asistente virtual especializado en tarjetas SIM y eSIM. 
Tu trabajo es ayudar a los clientes a elegir el mejor plan según sus necesidades.

Información actualizada de nuestros productos:

eSIMs disponibles:
${esimProducts}

SIMs físicas disponibles:
${physicalProducts}

Características importantes:
- Todas las eSIMs se activan instantáneamente
- Las SIMs físicas se envían por correo y requieren 24-48h para la entrega
- Todos los planes incluyen llamadas y SMS
- La validez de los planes es de 30 días desde la activación

Directrices:
1. Siempre recomienda planes basados en el consumo estimado del cliente
2. Explica las diferencias entre SIM física y eSIM cuando sea relevante
3. Si un cliente necesita más de 30 días, recomienda comprar múltiples planes
4. Menciona que los precios incluyen IVA
5. Si preguntan por compatibilidad de eSIM, solicita el modelo exacto del teléfono

Responde siempre de manera amable y profesional, utilizando la información más actualizada de los productos.`

    // Update the AI assistant settings with the new system prompt
    const { error: updateError } = await supabaseClient
      .from('chat_settings')
      .update({ 
        ai_system_prompt: systemPrompt,
        updated_at: new Date().toISOString()
      })
      .eq('id', (await supabaseClient.from('chat_settings').select('id').single()).data?.id)

    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'AI context updated successfully' 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error updating AI context:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})