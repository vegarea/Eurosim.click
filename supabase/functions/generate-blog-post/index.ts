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
    const { settings } = await req.json()
    
    // Generar el contenido del post con GPT-4
    const contentResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: settings.style_prompt
          },
          {
            role: "user",
            content: `Genera un artículo de blog sobre uno de estos temas: ${settings.topics.join(", ")}. 
                     El artículo debe incluir un título atractivo y estar estructurado en secciones con subtítulos.
                     Devuelve un JSON con esta estructura: { title: string, content: string, excerpt: string }`
          }
        ],
      }),
    })

    const contentData = await contentResponse.json()
    const generatedContent = JSON.parse(contentData.choices[0].message.content)

    // Crear el slug a partir del título
    const slug = generatedContent.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Inicializar el cliente de Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insertar el post en la base de datos
    const { error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: generatedContent.title,
        slug,
        content: generatedContent.content,
        excerpt: generatedContent.excerpt,
        status: 'draft',
        is_ai_generated: true,
        ai_prompt: settings.style_prompt,
        ai_model: 'gpt-4o-mini'
      })

    if (insertError) throw insertError

    return new Response(
      JSON.stringify({ success: true }),
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