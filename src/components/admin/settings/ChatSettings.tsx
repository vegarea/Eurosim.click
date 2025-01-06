import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

interface ChatSettings {
  id: string
  is_active: boolean
  chat_type: 'ai' | 'whatsapp'
  whatsapp_number: string
  whatsapp_message: string
  ai_welcome_message: string
  ai_system_prompt: string
}

export function ChatSettings() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: settings, isLoading } = useQuery({
    queryKey: ['chat-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_settings')
        .select('*')
        .single()

      if (error) throw error
      return data as ChatSettings
    }
  })

  const updateSettings = useMutation({
    mutationFn: async (updates: Partial<ChatSettings>) => {
      const { error } = await supabase
        .from('chat_settings')
        .update(updates)
        .eq('id', settings?.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-settings'] })
      toast({
        title: "Configuración actualizada",
        description: "Los cambios se han guardado correctamente."
      })
    },
    onError: (error) => {
      console.error('Error updating chat settings:', error)
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        variant: "destructive"
      })
    }
  })

  if (isLoading) {
    return <div>Cargando configuración...</div>
  }

  if (!settings) {
    return <div>No se pudo cargar la configuración</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Chat de Atención</h2>
        <p className="text-muted-foreground">
          Configura el chat flotante de atención al cliente
        </p>
      </div>
      
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Configuración General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Activar Chat Flotante</Label>
            <Switch
              id="isActive"
              checked={settings.is_active}
              onCheckedChange={(checked) => 
                updateSettings.mutate({ is_active: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Chat</Label>
            <Select
              value={settings.chat_type}
              onValueChange={(value: 'ai' | 'whatsapp') => 
                updateSettings.mutate({ chat_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="ai">Asistente Virtual (IA)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {settings.chat_type === 'whatsapp' && (
        <Card>
          <CardHeader>
            <CardTitle>Configuración de WhatsApp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">Número de WhatsApp</Label>
              <Input
                id="whatsappNumber"
                value={settings.whatsapp_number}
                onChange={(e) => 
                  updateSettings.mutate({ whatsapp_number: e.target.value })
                }
                placeholder="+34600000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappMessage">Mensaje Predeterminado</Label>
              <Input
                id="whatsappMessage"
                value={settings.whatsapp_message}
                onChange={(e) => 
                  updateSettings.mutate({ whatsapp_message: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      {settings.chat_type === 'ai' && (
        <Card>
          <CardHeader>
            <CardTitle>Configuración del Asistente Virtual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aiWelcome">Mensaje de Bienvenida</Label>
              <Input
                id="aiWelcome"
                value={settings.ai_welcome_message}
                onChange={(e) => 
                  updateSettings.mutate({ ai_welcome_message: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aiPrompt">Prompt del Sistema</Label>
              <textarea
                id="aiPrompt"
                className="w-full min-h-[100px] p-2 border rounded-md"
                value={settings.ai_system_prompt}
                onChange={(e) => 
                  updateSettings.mutate({ ai_system_prompt: e.target.value })
                }
              />
              <p className="text-sm text-muted-foreground">
                Este prompt define cómo se comportará el asistente virtual.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}