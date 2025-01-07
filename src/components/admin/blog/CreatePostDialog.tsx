import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Plus, Wand2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

export function CreatePostDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [prompt, setPrompt] = useState("")

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

      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title,
          content,
          slug,
          excerpt: content.substring(0, 160),
          is_ai_generated: Boolean(prompt),
          ai_prompt: prompt || null,
          status: 'draft'
        })

      if (error) throw error

      toast.success("Post creado exitosamente")
      setOpen(false)
      setTitle("")
      setContent("")
      setPrompt("")
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