import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { TopicsManager } from "./automation/TopicsManager"
import { GenerationSettings } from "./automation/GenerationSettings"
import { Loader2 } from "lucide-react"

type AutomationSettings = {
  id: string;
  is_active: boolean;
  style_prompt: string;
  generation_frequency: string;
  topics: string[];
  images_style_prompt: string;
  images_per_paragraph: number;
}

export function AutomationSettings() {
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [settings, setSettings] = useState<AutomationSettings | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_automation_settings')
        .select('*')
        .single()

      if (error) throw error

      // Asegurarnos de que topics sea un array de strings y convertir generation_frequency a string
      const parsedSettings: AutomationSettings = {
        id: data.id,
        is_active: data.is_active ?? false,
        style_prompt: data.style_prompt,
        generation_frequency: String(data.generation_frequency),
        topics: Array.isArray(data.topics) 
          ? data.topics.map(topic => String(topic))
          : [],
        images_style_prompt: data.images_style_prompt ?? '',
        images_per_paragraph: data.images_per_paragraph ?? 1
      }

      setSettings(parsedSettings)
    } catch (error) {
      console.error('Error loading settings:', error)
      toast.error("Error al cargar la configuración")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!settings) return

    try {
      const { error } = await supabase
        .from('blog_automation_settings')
        .update({
          is_active: settings.is_active,
          style_prompt: settings.style_prompt,
          generation_frequency: settings.generation_frequency,
          topics: settings.topics,
          images_style_prompt: settings.images_style_prompt,
          images_per_paragraph: settings.images_per_paragraph
        })
        .eq('id', settings.id)

      if (error) throw error

      toast.success("Configuración guardada exitosamente")
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error("Error al guardar la configuración")
    }
  }

  const handleGenerateNow = async () => {
    if (!settings) return

    try {
      setGenerating(true)
      const { error } = await supabase.functions.invoke('generate-blog-post', {
        body: { settings }
      })

      if (error) throw error

      toast.success("Post generado exitosamente")
    } catch (error) {
      console.error('Error generating post:', error)
      toast.error("Error al generar el post")
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return <div>Cargando configuración...</div>
  }

  if (!settings) {
    return <div>Error al cargar la configuración</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de Generación Automática</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="auto-gen">Generación automática</Label>
          <Switch
            id="auto-gen"
            checked={settings.is_active}
            onCheckedChange={(checked) => setSettings({ ...settings, is_active: checked })}
          />
        </div>

        <GenerationSettings
          stylePrompt={settings.style_prompt}
          onStylePromptChange={(value) => setSettings({ ...settings, style_prompt: value })}
          imagesStylePrompt={settings.images_style_prompt}
          onImagesStylePromptChange={(value) => setSettings({ ...settings, images_style_prompt: value })}
          imagesPerParagraph={settings.images_per_paragraph}
          onImagesPerParagraphChange={(value) => setSettings({ ...settings, images_per_paragraph: value })}
          generationFrequency={settings.generation_frequency}
          onGenerationFrequencyChange={(value) => setSettings({ ...settings, generation_frequency: value })}
        />

        <TopicsManager
          topics={settings.topics}
          onTopicsChange={(topics) => setSettings({ ...settings, topics })}
        />

        <div className="flex gap-4">
          <Button onClick={handleSaveSettings} className="flex-1">
            Guardar Configuración
          </Button>
          <Button 
            onClick={handleGenerateNow} 
            disabled={generating}
            className="flex-1"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generando...
              </>
            ) : (
              'Generar Post Ahora'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}