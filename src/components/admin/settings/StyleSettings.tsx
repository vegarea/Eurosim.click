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
          <Label htmlFor="primary-color">Color primario</Label>
          <Input
            id="primary-color"
            type="color"
            className="h-10 w-20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="secondary-color">Color secundario</Label>
          <Input
            id="secondary-color"
            type="color"
            className="h-10 w-20"
          />
        </div>
        <Button onClick={handleSave}>Guardar cambios</Button>
      </CardContent>
    </Card>
  )
}