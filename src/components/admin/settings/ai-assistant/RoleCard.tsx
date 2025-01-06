import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

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
  const [localPrompt, setLocalPrompt] = useState(role.system_prompt)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (localPrompt === role.system_prompt) return
    
    setIsSaving(true)
    try {
      await onUpdate(role.id, { system_prompt: localPrompt })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{role.name}</h3>
            <p className="text-sm text-muted-foreground">{role.description}</p>
          </div>
          <Switch
            checked={role.is_active}
            onCheckedChange={(checked) => onUpdate(role.id, { is_active: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label>Prompt del Sistema</Label>
          <Textarea
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            rows={4}
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Este prompt define la personalidad y comportamiento del asistente en este rol.
            </p>
            <Button
              onClick={handleSave}
              disabled={isSaving || localPrompt === role.system_prompt}
              size="sm"
            >
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}