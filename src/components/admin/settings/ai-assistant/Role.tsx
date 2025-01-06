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

interface RoleProps {
  role: AssistantRole
  onUpdate: (updates: Partial<AssistantRole>) => void
}

export function Role({ role, onUpdate }: RoleProps) {
  const { toast } = useToast()
  const [prompt, setPrompt] = useState(role.system_prompt)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setPrompt(role.system_prompt)
    setHasChanges(false)
  }, [role.system_prompt])

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value
    setPrompt(newPrompt)
    setHasChanges(newPrompt !== role.system_prompt)
  }

  const handleSave = async () => {
    try {
      await onUpdate({ system_prompt: prompt })
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
    }
  }

  const handleToggleActive = async (checked: boolean) => {
    try {
      await onUpdate({ is_active: checked })
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
            <h3 className="text-lg font-medium">{role.name}</h3>
            <p className="text-sm text-muted-foreground">{role.description}</p>
          </div>
          <Switch
            checked={role.is_active}
            onCheckedChange={handleToggleActive}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`prompt-${role.id}`}>Prompt del Sistema</Label>
          <Textarea
            id={`prompt-${role.id}`}
            value={prompt}
            onChange={handlePromptChange}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="relative"
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}