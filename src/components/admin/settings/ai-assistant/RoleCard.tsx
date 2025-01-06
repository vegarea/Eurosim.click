import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AssistantRole {
  id: string
  role: 'sales' | 'support' | 'compatibility_checker' | 'blog_writer'
  name: string
  description: string | null
  system_prompt: string
  is_active: boolean
}

interface RoleCardProps {
  role: AssistantRole
  onUpdate: (roleId: string, updates: Partial<AssistantRole>) => Promise<void>
}

export function RoleCard({ role, onUpdate }: RoleCardProps) {
  const { toast } = useToast()
  const [localPrompt, setLocalPrompt] = useState(role.system_prompt)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setLocalPrompt(role.system_prompt)
  }, [role.system_prompt])

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value
    setLocalPrompt(newPrompt)
    setHasChanges(newPrompt !== role.system_prompt)
  }

  const handleSave = async () => {
    if (!hasChanges) return
    
    setIsSaving(true)
    try {
      await onUpdate(role.id, { system_prompt: localPrompt })
      toast({
        title: "Cambios guardados",
        description: "El prompt se ha actualizado correctamente."
      })
      setHasChanges(false)
    } catch (error) {
      console.error('Error al guardar:', error)
      toast({
        title: "Error al guardar",
        description: "No se pudieron guardar los cambios. Por favor, intenta de nuevo.",
        variant: "destructive"
      })
      setLocalPrompt(role.system_prompt)
      setHasChanges(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleActive = async (checked: boolean) => {
    try {
      await onUpdate(role.id, { is_active: checked })
      toast({
        title: checked ? "Rol activado" : "Rol desactivado",
        description: `El rol ha sido ${checked ? 'activado' : 'desactivado'} correctamente.`
      })
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del rol.",
        variant: "destructive"
      })
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">{role.name}</h3>
            <p className="text-sm text-muted-foreground">{role.description}</p>
          </div>
          <Switch
            checked={role.is_active}
            onCheckedChange={handleToggleActive}
          />
        </div>

        <div className="space-y-2">
          <Label>Prompt del Sistema</Label>
          <Textarea
            value={localPrompt}
            onChange={handlePromptChange}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Este prompt define la personalidad y comportamiento del asistente en este rol.
          </p>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            size="sm"
            className="z-10"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}