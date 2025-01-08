import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { TopicsManager } from "./automation/TopicsManager"
import { GenerationSettings } from "./automation/GenerationSettings"

export function AutomationSettings() {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<{
    id: string;
    is_active: boolean;
    style_prompt: string;
    generation_frequency: string;
    topics: string[];
    images_style_prompt: string;
    images_per_paragraph: number;
  } | null>(null)

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

      // Asegurarnos de que topics sea un array de strings
      const parsedTopics = Array.isArray(data.topics) 
        ? data.topics.map(topic => String(topic))
        : []

      setSettings({
        ...data,
        topics: parsedTopics
      })
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

        <Button onClick={handleSaveSettings} className="w-full">
          Guardar Configuración
        </Button>
      </CardContent>
    </Card>
  )
}