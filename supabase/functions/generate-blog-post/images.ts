import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.3.0"

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const configuration = new Configuration({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
})

const openai = new OpenAIApi(configuration)

export async function generateAndUploadImage(prompt: string, stylePrompt: string) {
  try {
    const fullPrompt = `${prompt}. ${stylePrompt}`
    console.log('Generating image with prompt:', fullPrompt)

    const response = await openai.createImage({
      prompt: fullPrompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    })

    if (!response.data.data[0].b64_json) {
      throw new Error('No image data received from OpenAI')
    }

    const base64Image = response.data.data[0].b64_json
    const buffer = Uint8Array.from(atob(base64Image), c => c.charCodeAt(0))
    
    // Generar un nombre único para la imagen
    const timestamp = new Date().getTime()
    const randomString = Math.random().toString(36).substring(7)
    const filename = `${timestamp}-${randomString}.png`
    const storagePath = `blog_images/${filename}`

    // Subir la imagen a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('blog_images')
      .upload(storagePath, buffer, {
        contentType: 'image/png',
        cacheControl: '3600',
      })

    if (uploadError) throw uploadError

    // Obtener la URL pública de la imagen
    const { data: { publicUrl } } = supabase
      .storage
      .from('blog_images')
      .getPublicUrl(storagePath)

    return {
      url: publicUrl,
      width: 1024,
      height: 1024,
      size_bytes: buffer.length,
      mime_type: 'image/png',
      storage_path: storagePath
    }

  } catch (error) {
    console.error('Error generating or uploading image:', error)
    return null
  }
}