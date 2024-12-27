import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function SeoSettings() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios en SEO se han guardado correctamente.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Configuración SEO
        </CardTitle>
        <CardDescription>
          Optimiza tu sitio web para los motores de búsqueda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="meta-title">Meta título</Label>
          <Input
            id="meta-title"
            placeholder="Título para motores de búsqueda"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="meta-description">Meta descripción</Label>
          <Input
            id="meta-description"
            placeholder="Descripción para motores de búsqueda"
          />
        </div>
        <Button onClick={handleSave}>Guardar cambios</Button>
      </CardContent>
    </Card>
  )
}