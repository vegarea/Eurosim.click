import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Bot, Sparkles } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

export function AIAssistantSettings() {
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 500,
    isActive: true
  })
  const [roles, setRoles] = useState([])

  const handleSaveSettings = async () => {
    try {
      setIsUpdating(true)
      const { error } = await supabase
        .from('ai_assistant_settings')
        .update({
          temperature: settings.temperature,
          max_tokens: settings.maxTokens,
          is_active: settings.isActive
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
      setIsUpdating(false)
    }
  }

  const handleUpdateRole = async (roleId: string, updates: any) => {
    try {
      setIsUpdating(true)
      const { error } = await supabase
        .from('ai_assistant_roles')
        .update(updates)
        .eq('id', roleId)

      if (error) throw error

      toast({
        title: "Rol actualizado",
        description: "Los cambios en el rol del asistente se han guardado correctamente."
      })
    } catch (error) {
      console.error('Error updating role:', error)
      toast({
        title: "Error al actualizar",
        description: "No se pudieron guardar los cambios. Por favor intenta de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Configuración General del Asistente
          </CardTitle>
          <CardDescription>
            Configura los parámetros globales del asistente virtual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Activar Asistente Virtual</Label>
            <Switch
              id="isActive"
              checked={settings.isActive}
              onCheckedChange={(checked) => setSettings(s => ({ ...s, isActive: checked }))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperatura</Label>
            <Input
              id="temperature"
              type="number"
              min={0}
              max={1}
              step={0.1}
              value={settings.temperature}
              onChange={(e) => setSettings(s => ({ ...s, temperature: parseFloat(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxTokens">Tokens Máximos</Label>
            <Input
              id="maxTokens"
              type="number"
              min={100}
              max={2000}
              step={100}
              value={settings.maxTokens}
              onChange={(e) => setSettings(s => ({ ...s, maxTokens: parseInt(e.target.value) }))}
            />
          </div>

          <Button 
            onClick={handleSaveSettings} 
            disabled={isUpdating}
            className="w-full"
          >
            Guardar Configuración
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Roles del Asistente
          </CardTitle>
          <CardDescription>
            Gestiona los diferentes roles y personalidades del asistente virtual
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {roles.map((role) => (
            <div key={role.id} className="space-y-4 pb-4 border-b last:border-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{role.name}</h4>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <Switch
                  checked={role.is_active}
                  onCheckedChange={(checked) => handleUpdateRole(role.id, { is_active: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label>Prompt del Sistema</Label>
                <Textarea
                  value={role.system_prompt}
                  onChange={(e) => handleUpdateRole(role.id, { system_prompt: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}