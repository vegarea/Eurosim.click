import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function StyleSettings() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios en estilo se han guardado correctamente.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Personalización de estilo
        </CardTitle>
        <CardDescription>
          Personaliza los colores y estilos de tu sitio web
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="primary-color">Color primario (actual)</Label>
          <Input
            id="primary-color"
            type="color"
            value="#E02653"
            className="h-10 w-20"
            disabled
          />
          <p className="text-sm text-muted-foreground">
            Este es el color principal usado en botones y elementos destacados
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="secondary-color">Color secundario (actual)</Label>
          <Input
            id="secondary-color"
            type="color"
            value="#fc2c03"
            className="h-10 w-20"
            disabled
          />
          <p className="text-sm text-muted-foreground">
            Este es el color secundario usado en elementos complementarios
          </p>
        </div>
        <Button onClick={handleSave} disabled>Guardar cambios</Button>
      </CardContent>
    </Card>
  )
}