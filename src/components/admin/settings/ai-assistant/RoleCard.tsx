import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

interface AssistantRole {
  id: string
  role: 'sales' | 'support' | 'compatibility_checker'
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
            value={role.system_prompt}
            onChange={(e) => onUpdate(role.id, { system_prompt: e.target.value })}
            rows={4}
          />
          <p className="text-sm text-muted-foreground">
            Este prompt define la personalidad y comportamiento del asistente en este rol.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}