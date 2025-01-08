import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function generateImage(prompt: string) {
  console.log('Generating image with prompt:', prompt)
  
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    }),
  })

  const data = await response.json()
  if (!data.data?.[0]?.url) {
    throw new Error('No se pudo generar la imagen')
  }

  return data.data[0].url
}

async function uploadImageToSupabase(imageUrl: string, supabase: any, postId: string, isFeatured: boolean = false) {
  // Descargar la imagen de DALL-E
  const imageResponse = await fetch(imageUrl)
  const imageBlob = await imageResponse.blob()

  // Subir a Supabase Storage
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

  // Guardar en la tabla blog_post_images
  const { data: imageData, error: imageError } = await supabase
    .from('blog_post_images')
    .insert({
      post_id: postId,
      url: publicUrl,
      alt_text: 'Imagen generada por IA',
      width: 1024,
      height: 1024,
      size_bytes: imageBlob.size,
      mime_type: 'image/png',
      is_featured: isFeatured,
      is_ai_generated: true,
      storage_path: fileName
    })
    .select()
    .single()

  if (imageError) throw imageError

  return imageData
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { settings } = await req.json()
    console.log('Received settings:', settings)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const randomTopic = settings.topics[Math.floor(Math.random() * settings.topics.length)]
    console.log('Selected topic:', randomTopic)

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `${settings.style_prompt}
            Genera contenido bien estructurado usando etiquetas HTML:
            - Usa <h1> para el título principal
            - Usa <h2> para subtítulos principales
            - Usa <h3> para subtítulos secundarios
            - Usa <p> para párrafos
            - Usa <ul> y <li> para listas
            - Usa <strong> para texto importante
            - Usa <em> para énfasis
            - Añade <br> entre secciones importantes
            Asegúrate de que el contenido sea detallado y bien organizado.
            Divide el contenido en párrafos claros para poder insertar imágenes entre ellos.`
          },
          {
            role: "user",
            content: `Genera un artículo de blog sobre: ${randomTopic}. 
                     El artículo debe tener un título atractivo, contenido detallado y un resumen breve.
                     Devuelve un JSON con esta estructura exacta:
                     { 
                       "title": "título del artículo",
                       "content": "contenido completo en HTML",
                       "excerpt": "resumen breve de 2-3 líneas",
                       "imagePrompts": ["prompt para la imagen de portada", "prompt para imagen 1", "prompt para imagen 2"]
                     }`
          }
        ]
      })
    })

    if (!openAIResponse.ok) {
      const error = await openAIResponse.text()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${error}`)
    }

    const openAIData = await openAIResponse.json()
    console.log('OpenAI response received')
    
    const generatedContent = JSON.parse(openAIData.choices[0].message.content)

    // Create slug from title
    const slug = generatedContent.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Insert the post into the database
    const { data: post, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: generatedContent.title,
        slug,
        content: generatedContent.content,
        excerpt: generatedContent.excerpt,
        status: 'published',
        is_ai_generated: true,
        ai_prompt: settings.style_prompt,
        ai_model: 'gpt-4o-mini',
        views_count: 0,
        published_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting post:', insertError)
      throw insertError
    }

    console.log('Post created successfully:', post)

    // Generar y subir la imagen de portada
    try {
      const featuredImagePrompt = `${settings.images_style_prompt}. ${generatedContent.imagePrompts[0]}`
      const featuredImageUrl = await generateImage(featuredImagePrompt)
      const featuredImage = await uploadImageToSupabase(featuredImageUrl, supabase, post.id, true)

      // Actualizar el post con la imagen destacada
      await supabase
        .from('blog_posts')
        .update({ featured_image_id: featuredImage.id })
        .eq('id', post.id)

      // Generar imágenes adicionales si se configuró
      if (settings.images_per_paragraph > 0) {
        for (let i = 1; i < generatedContent.imagePrompts.length && i <= settings.images_per_paragraph; i++) {
          const prompt = `${settings.images_style_prompt}. ${generatedContent.imagePrompts[i]}`
          const imageUrl = await generateImage(prompt)
          await uploadImageToSupabase(imageUrl, supabase, post.id, false)
        }
      }
    } catch (imageError) {
      console.error('Error generating/uploading images:', imageError)
      // No lanzamos el error para que el post se cree aunque falle la generación de imágenes
    }

    return new Response(
      JSON.stringify({ success: true, post }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in generate-blog-post function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})