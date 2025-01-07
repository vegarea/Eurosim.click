import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

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
  const [newTopic, setNewTopic] = useState("")

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

      setSettings({
        ...data,
        topics: Array.isArray(data.topics) ? data.topics : []
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

  const handleAddTopic = () => {
    if (!settings || !newTopic.trim()) return
    
    setSettings({
      ...settings,
      topics: [...settings.topics, newTopic.trim()]
    })
    setNewTopic("")
  }

  const handleRemoveTopic = (topicToRemove: string) => {
    if (!settings) return
    
    setSettings({
      ...settings,
      topics: settings.topics.filter(topic => topic !== topicToRemove)
    })
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

        <div className="space-y-2">
          <Label>Frecuencia de generación</Label>
          <div className="grid grid-cols-2 gap-4">
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={settings.generation_frequency}
              onChange={(e) => setSettings({ ...settings, generation_frequency: e.target.value })}
            >
              <option value="7 days">7 días</option>
              <option value="14 days">14 días</option>
              <option value="1 month">1 mes</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Prompt general del estilo</Label>
          <Textarea 
            value={settings.style_prompt}
            onChange={(e) => setSettings({ ...settings, style_prompt: e.target.value })}
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            Este prompt se usará como base para definir el estilo y tono de todos los artículos generados
          </p>
        </div>

        <div className="space-y-2">
          <Label>Estilo de imágenes</Label>
          <Textarea 
            value={settings.images_style_prompt}
            onChange={(e) => setSettings({ ...settings, images_style_prompt: e.target.value })}
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            Este prompt se usará como base para generar las imágenes de los artículos
          </p>
        </div>

        <div className="space-y-2">
          <Label>Imágenes por párrafo</Label>
          <Input
            type="number"
            min={0}
            max={3}
            value={settings.images_per_paragraph}
            onChange={(e) => setSettings({ ...settings, images_per_paragraph: parseInt(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label>Temas para generar artículos</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Añadir nuevo tema..."
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTopic()}
            />
            <Button 
              onClick={handleAddTopic}
              disabled={!newTopic.trim()}
            >
              Añadir
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {settings.topics.map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
              >
                <span>{topic}</span>
                <button
                  onClick={() => handleRemoveTopic(topic)}
                  className="text-secondary-foreground/70 hover:text-secondary-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSaveSettings} className="w-full">
          Guardar Configuración
        </Button>
      </CardContent>
    </Card>
  )
}