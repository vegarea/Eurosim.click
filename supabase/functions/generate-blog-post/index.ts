import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()

    if (!prompt) {
      throw new Error('No prompt provided')
    }

    console.log('Generating blog post with prompt:', prompt)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Eres un escritor experto que genera artículos de blog de alta calidad. Genera el contenido en formato HTML con etiquetas básicas como p, h2, h3, ul, li, etc.'
          },
          {
            role: 'user',
            content: `Genera un artículo de blog sobre: ${prompt}. Incluye un título atractivo y el contenido estructurado. Responde con un JSON que tenga dos campos: "title" y "content".`
          }
        ],
      }),
    })

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text())
      throw new Error('Error calling OpenAI API')
    }

    const data = await response.json()
    console.log('OpenAI response:', data)

    const generatedText = data.choices[0].message.content
    const parsed = JSON.parse(generatedText)

    return new Response(
      JSON.stringify(parsed),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-blog-post function:', error)
    return new Response(
      JSON.stringify({ error: 'Error al generar el contenido', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})