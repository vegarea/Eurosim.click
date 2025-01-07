import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
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
    const { prompt } = await req.json()

    // Generar imagen con DALL-E
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      }),
    })

    const data = await response.json()
    
    if (!data.data?.[0]?.url) {
      throw new Error('No se pudo generar la imagen')
    }

    // Descargar la imagen de DALL-E
    const imageResponse = await fetch(data.data[0].url)
    const imageBlob = await imageResponse.blob()

    // Subir a Supabase Storage
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const fileName = `${crypto.randomUUID()}.png`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog_images')
      .upload(fileName, imageBlob, {
        contentType: 'image/png',
        upsert: false
      })

    if (uploadError) throw uploadError

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('blog_images')
      .getPublicUrl(fileName)

    return new Response(
      JSON.stringify({ 
        url: publicUrl,
        storage_path: fileName,
        width: 1024,
        height: 1024,
        size_bytes: imageBlob.size,
        mime_type: 'image/png'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})