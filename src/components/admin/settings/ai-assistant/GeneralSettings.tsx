import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bot } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface AssistantSettings {
  id: string
  is_active: boolean
  temperature: number
  max_tokens: number
}

export function GeneralSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState<AssistantSettings | null>(null)

  const loadSettings = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('ai_assistant_settings')
        .select('*')
        .single()

      if (error) throw error
      setSettings(data)
    } catch (error) {
      console.error('Error loading AI settings:', error)
      toast({
        title: "Error",
        description: "No se pudo cargar la configuración del asistente",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    if (!settings) return

    try {
      setIsLoading(true)
      const { error } = await supabase
        .from('ai_assistant_settings')
        .update({
          is_active: settings.is_active,
          temperature: settings.temperature,
          max_tokens: settings.max_tokens
        })
        .eq('id', settings.id)

      if (error) throw error

      toast({
        title: "Configuración guardada",
        description: "Los cambios en la configuración del asistente se han guardado correctamente."
      })
    } catch (error) {
      console.error('Error saving AI settings:', error)
      toast({
        title: "Error al guardar",
        description: "No se pudieron guardar los cambios. Por favor intenta de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !settings) {
    return <div>Cargando configuración...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Configuración General del Asistente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="isActive">Activar Asistente Virtual</Label>
          <Switch
            id="isActive"
            checked={settings.is_active}
            onCheckedChange={(checked) => setSettings({ ...settings, is_active: checked })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="temperature">Temperatura (Creatividad)</Label>
          <Input
            id="temperature"
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={settings.temperature}
            onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
          />
          <p className="text-sm text-muted-foreground">
            Valores más altos (0.8-1.0) generan respuestas más creativas, valores más bajos (0.2-0.5) generan respuestas más precisas.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxTokens">Tokens Máximos</Label>
          <Input
            id="maxTokens"
            type="number"
            min={100}
            max={2000}
            step={100}
            value={settings.max_tokens}
            onChange={(e) => setSettings({ ...settings, max_tokens: parseInt(e.target.value) })}
          />
          <p className="text-sm text-muted-foreground">
            Limita la longitud máxima de las respuestas del asistente.
          </p>
        </div>

        <Button 
          onClick={handleSaveSettings} 
          disabled={isLoading}
          className="w-full"
        >
          Guardar Configuración
        </Button>
      </CardContent>
    </Card>
  )
}