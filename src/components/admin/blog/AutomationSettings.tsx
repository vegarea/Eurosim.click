import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface AutomationSettingsProps {
  autoGenEnabled: boolean
  onAutoGenChange: (checked: boolean) => void
}

export function AutomationSettings({
  autoGenEnabled,
  onAutoGenChange
}: AutomationSettingsProps) {
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
            checked={autoGenEnabled}
            onCheckedChange={onAutoGenChange}
          />
        </div>

        <div className="space-y-2">
          <Label>Frecuencia de generación</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                placeholder="7"
                disabled={!autoGenEnabled}
              />
            </div>
            <div>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                disabled={!autoGenEnabled}
              >
                <option value="days">Días</option>
                <option value="weeks">Semanas</option>
                <option value="months">Meses</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Temas principales</Label>
          <Input
            placeholder="Europa, viajes, turismo, cultura..."
            disabled={!autoGenEnabled}
          />
          <p className="text-sm text-muted-foreground">
            Separa los temas con comas para variar el contenido generado
          </p>
        </div>
      </CardContent>
    </Card>
  )
}