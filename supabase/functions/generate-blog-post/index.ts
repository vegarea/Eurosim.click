import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { generateContent } from "./openai.ts"
import { generateAndUploadImage } from "./images.ts"
import { BlogSettings } from "./types.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { settings } = await req.json()
    console.log('Received settings:', settings)

    // Seleccionar un tema aleatorio
    const randomTopic = settings.topics[Math.floor(Math.random() * settings.topics.length)]
    console.log('Selected topic:', randomTopic)

    // Generar contenido
    const generatedContent = await generateContent(randomTopic, settings.style_prompt)
    console.log('Content generated successfully')

    // Crear el post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        title: generatedContent.title,
        slug: generatedContent.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        content: generatedContent.content,
        excerpt: generatedContent.excerpt,
        status: 'published',
        is_ai_generated: true,
        ai_prompt: settings.style_prompt,
        ai_model: 'gpt-4',
        views_count: 0,
        published_at: new Date().toISOString()
      })
      .select()
      .single()

    if (postError) throw postError
    console.log('Post created successfully:', post.id)

    // Generar y subir imágenes
    try {
      if (generatedContent.imagePrompts && generatedContent.imagePrompts.length > 0) {
        // Imagen destacada
        const featuredImage = await generateAndUploadImage(
          generatedContent.imagePrompts[0],
          settings.images_style_prompt
        )
        console.log('Featured image generated successfully')

        if (featuredImage) {
          const { data: dbImage, error: imageError } = await supabase
            .from('blog_post_images')
            .insert({
              post_id: post.id,
              url: featuredImage.url,
              alt_text: generatedContent.title,
              width: featuredImage.width,
              height: featuredImage.height,
              size_bytes: featuredImage.size_bytes,
              mime_type: featuredImage.mime_type,
              is_featured: true,
              is_ai_generated: true,
              ai_prompt: generatedContent.imagePrompts[0],
              storage_path: featuredImage.storage_path
            })
            .select()
            .single()

          if (imageError) throw imageError
          console.log('Featured image saved to database')

          // Actualizar el post con la imagen destacada
          await supabase
            .from('blog_posts')
            .update({ featured_image_id: dbImage.id })
            .eq('id', post.id)
        }

        // Generar imágenes adicionales según la configuración
        if (settings.images_per_paragraph > 0) {
          for (let i = 1; i < Math.min(generatedContent.imagePrompts.length, settings.images_per_paragraph + 1); i++) {
            const image = await generateAndUploadImage(
              generatedContent.imagePrompts[i],
              settings.images_style_prompt
            )
            
            if (image) {
              await supabase
                .from('blog_post_images')
                .insert({
                  post_id: post.id,
                  url: image.url,
                  alt_text: `Imagen ${i} para ${generatedContent.title}`,
                  width: image.width,
                  height: image.height,
                  size_bytes: image.size_bytes,
                  mime_type: image.mime_type,
                  is_featured: false,
                  position: i,
                  is_ai_generated: true,
                  ai_prompt: generatedContent.imagePrompts[i],
                  storage_path: image.storage_path
                })
            }
          }
        }
      }
    } catch (imageError) {
      console.error('Error generating images:', imageError)
      // Continuamos aunque falle la generación de imágenes
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