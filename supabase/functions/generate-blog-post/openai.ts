import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.3.0"

const configuration = new Configuration({
  apiKey: Deno.env.get('OPENAI_API_KEY'),
})

const openai = new OpenAIApi(configuration)

export async function generateContent(topic: string, stylePrompt: string) {
  const prompt = `
    Escribe un artículo de blog sobre "${topic}".
    
    ${stylePrompt}
    
    El artículo debe incluir:
    - Un título atractivo
    - Un resumen (excerpt) de 2-3 oraciones
    - Contenido estructurado con etiquetas HTML (h1, h2, p, ul, li)
    - Al menos 3 secciones con subtítulos
    - Conclusión
    
    También necesito prompts para generar imágenes relacionadas con cada sección principal.
    
    Formato de respuesta:
    {
      "title": "Título del artículo",
      "excerpt": "Resumen del artículo",
      "content": "Contenido HTML completo",
      "imagePrompts": ["prompt para imagen 1", "prompt para imagen 2", ...]
    }
  `

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })

    const response = completion.data.choices[0].message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Parsear la respuesta JSON
    try {
      return JSON.parse(response)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      console.log('Raw response:', response)
      throw new Error('Invalid JSON response from OpenAI')
    }
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    throw error
  }
}