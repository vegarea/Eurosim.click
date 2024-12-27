import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface AutomationSettingsProps {
  autoGenEnabled: boolean
  onAutoGenChange: (checked: boolean) => void
}

export function AutomationSettings({
  autoGenEnabled,
  onAutoGenChange
}: AutomationSettingsProps) {
  const [newTheme, setNewTheme] = useState("")
  const [themes, setThemes] = useState<string[]>([
    "Europa",
    "Viajes",
    "Turismo",
    "Cultura"
  ])

  const handleAddTheme = () => {
    if (newTheme.trim() && !themes.includes(newTheme.trim())) {
      setThemes([...themes, newTheme.trim()])
      setNewTheme("")
    }
  }

  const handleRemoveTheme = (themeToRemove: string) => {
    setThemes(themes.filter(theme => theme !== themeToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTheme()
    }
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
          <Label>Prompt general del estilo</Label>
          <Textarea 
            placeholder="Escribe un artículo con un tono informal y amigable, incluyendo consejos prácticos y experiencias personales..."
            disabled={!autoGenEnabled}
            className="min-h-[100px]"
          />
          <p className="text-sm text-muted-foreground">
            Este prompt se usará como base para definir el estilo y tono de todos los artículos generados
          </p>
        </div>

        <div className="space-y-2">
          <Label>Temas para generar artículos</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Añadir nuevo tema..."
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!autoGenEnabled}
            />
            <Button 
              onClick={handleAddTheme}
              disabled={!autoGenEnabled || !newTheme.trim()}
            >
              Añadir
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {themes.map((theme) => (
              <div
                key={theme}
                className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
              >
                <span>{theme}</span>
                <button
                  onClick={() => handleRemoveTheme(theme)}
                  className="text-secondary-foreground/70 hover:text-secondary-foreground"
                  disabled={!autoGenEnabled}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Los artículos se generarán basándose en estos temas
          </p>
        </div>
      </CardContent>
    </Card>
  )
}