import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Wand2, Image } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

export function CreatePostDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [imageGenerating, setImageGenerating] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [prompt, setPrompt] = useState("")
  const [imagePrompt, setImagePrompt] = useState("")
  const [featuredImage, setFeaturedImage] = useState<{
    url: string;
    storage_path: string;
    width: number;
    height: number;
    size_bytes: number;
    mime_type: string;
  } | null>(null)

  const generateWithAI = async () => {
    if (!prompt) {
      toast.error("Por favor ingresa un prompt para generar el contenido")
      return
    }

    setAiGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: { prompt }
      })

      if (error) throw error

      setTitle(data.title)
      setContent(data.content)
      toast.success("Contenido generado exitosamente")
    } catch (error) {
      console.error('Error generating content:', error)
      toast.error("Error al generar el contenido")
    } finally {
      setAiGenerating(false)
    }
  }

  const generateImage = async () => {
    if (!imagePrompt) {
      toast.error("Por favor ingresa un prompt para generar la imagen")
      return
    }

    setImageGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-image', {
        body: { prompt: imagePrompt }
      })

      if (error) throw error

      setFeaturedImage(data)
      toast.success("Imagen generada exitosamente")
    } catch (error) {
      console.error('Error generating image:', error)
      toast.error("Error al generar la imagen")
    } finally {
      setImageGenerating(false)
    }
  }

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Por favor completa todos los campos")
      return
    }

    setLoading(true)
    try {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')

      let featuredImageId = null

      // Si hay una imagen generada, guardarla primero
      if (featuredImage) {
        const { data: imageData, error: imageError } = await supabase
          .from('blog_post_images')
          .insert({
            url: featuredImage.url,
            storage_path: featuredImage.storage_path,
            width: featuredImage.width,
            height: featuredImage.height,
            size_bytes: featuredImage.size_bytes,
            mime_type: featuredImage.mime_type,
            is_featured: true,
            is_ai_generated: true,
            ai_prompt: imagePrompt,
            alt_text: imagePrompt
          })
          .select()
          .single()

        if (imageError) throw imageError
        featuredImageId = imageData.id
      }

      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title,
          content,
          slug,
          excerpt: content.substring(0, 160),
          is_ai_generated: Boolean(prompt),
          ai_prompt: prompt || null,
          status: 'draft',
          featured_image_id: featuredImageId
        })

      if (error) throw error

      toast.success("Post creado exitosamente")
      setOpen(false)
      setTitle("")
      setContent("")
      setPrompt("")
      setImagePrompt("")
      setFeaturedImage(null)
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error("Error al crear el post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Prompt para IA (opcional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Escribe un artículo sobre..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button 
                variant="secondary" 
                onClick={generateWithAI}
                disabled={aiGenerating || !prompt}
              >
                {aiGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Prompt para imagen (opcional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Genera una imagen de..."
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
              />
              <Button 
                variant="secondary" 
                onClick={generateImage}
                disabled={imageGenerating || !imagePrompt}
              >
                {imageGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Image className="mr-2 h-4 w-4" />
                )}
                Generar
              </Button>
            </div>
          </div>

          {featuredImage && (
            <div className="space-y-2">
              <Label>Imagen generada</Label>
              <img 
                src={featuredImage.url} 
                alt={imagePrompt}
                className="w-full max-w-md rounded-lg shadow-md" 
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              placeholder="Título del post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Contenido</Label>
            <Textarea
              placeholder="Contenido del post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-[300px]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Guardar Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}