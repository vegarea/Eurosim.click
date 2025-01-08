import { GeneratedContent } from "./types.ts";

export async function generateContent(topic: string, stylePrompt: string): Promise<GeneratedContent> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
          content: `${stylePrompt}
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
          content: `Genera un artículo de blog sobre: ${topic}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
  });

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Extract title from content (assuming it's the first <h1> tag)
  const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : 'Artículo sin título';

  // Generate excerpt from content (first paragraph without HTML tags)
  const excerptMatch = content.match(/<p>(.*?)<\/p>/);
  const excerpt = excerptMatch ? excerptMatch[1].replace(/<[^>]*>/g, '') : '';

  // Generate image prompts based on content sections
  const sections = content.split(/<h[23]>/).slice(1);
  const imagePrompts = sections.map(section => {
    const cleanText = section.replace(/<[^>]*>/g, '').slice(0, 100);
    return `Genera una imagen que represente: ${cleanText}`;
  });

  return {
    title,
    content,
    excerpt,
    imagePrompts: [
      `Imagen de portada para artículo sobre: ${title}`,
      ...imagePrompts
    ]
  };
}