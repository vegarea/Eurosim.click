import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bot } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

interface AssistantSettings {
  id: string
  is_active: boolean
  temperature: number
  max_tokens: number
}

interface AssistantRole {
  id: string
  role: 'sales' | 'support' | 'compatibility_checker' | 'blog_writer'
  name: string
  description: string | null
  system_prompt: string
  is_active: boolean
}

export function AIAssistantSettings() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Consulta para obtener la configuración general
  const { data: settings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ['ai-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_assistant_settings')
        .select('*')
        .single()

      if (error) throw error
      return data as AssistantSettings
    }
  })

  // Consulta para obtener los roles
  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryKey: ['ai-roles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_assistant_roles')
        .select('*')
        .order('role')

      if (error) throw error
      return data as AssistantRole[]
    }
  })

  // Mutación para actualizar la configuración
  const updateSettings = useMutation({
    mutationFn: async (updates: Partial<AssistantSettings>) => {
      const { error } = await supabase
        .from('ai_assistant_settings')
        .update(updates)
        .eq('id', settings?.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-settings'] })
      toast({
        title: "Configuración actualizada",
        description: "Los cambios se han guardado correctamente."
      })
    },
    onError: (error) => {
      console.error('Error updating settings:', error)
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        variant: "destructive"
      })
    }
  })

  // Mutación para actualizar roles
  const updateRole = useMutation({
    mutationFn: async ({ roleId, updates }: { roleId: string, updates: Partial<AssistantRole> }) => {
      const { error } = await supabase
        .from('ai_assistant_roles')
        .update(updates)
        .eq('id', roleId)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-roles'] })
      toast({
        title: "Rol actualizado",
        description: "Los cambios se han guardado correctamente."
      })
    },
    onError: (error) => {
      console.error('Error updating role:', error)
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        variant: "destructive"
      })
    }
  })

  if (isLoadingSettings || isLoadingRoles) {
    return <div>Cargando configuración...</div>
  }

  if (!settings || !roles) {
    return <div>No se pudo cargar la configuración</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Asistente Virtual</h2>
        <p className="text-muted-foreground">
          Configura el comportamiento y roles del asistente virtual
        </p>
      </div>
      
      <Separator />

      {/* Configuración General */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Configuración General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="isActive">Activar Asistente Virtual</Label>
            <Switch
              id="isActive"
              checked={settings.is_active}
              onCheckedChange={(checked) => 
                updateSettings.mutate({ is_active: checked })
              }
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
              onChange={(e) => 
                updateSettings.mutate({ temperature: parseFloat(e.target.value) })
              }
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
              onChange={(e) => 
                updateSettings.mutate({ max_tokens: parseInt(e.target.value) })
              }
            />
            <p className="text-sm text-muted-foreground">
              Limita la longitud máxima de las respuestas del asistente.
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Roles del Asistente */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Roles del Asistente</h3>
        <div className="grid gap-4">
          {roles.map((role) => (
            <Card key={role.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium">{role.name}</h4>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <Switch
                    checked={role.is_active}
                    onCheckedChange={(checked) => 
                      updateRole.mutate({ 
                        roleId: role.id, 
                        updates: { is_active: checked } 
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Prompt del Sistema</Label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={role.system_prompt}
                    onChange={(e) => 
                      updateRole.mutate({
                        roleId: role.id,
                        updates: { system_prompt: e.target.value }
                      })
                    }
                  />
                </div>

                <Button 
                  onClick={() => 
                    updateRole.mutate({
                      roleId: role.id,
                      updates: { system_prompt: role.system_prompt }
                    })
                  }
                  className="mt-4"
                >
                  Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}