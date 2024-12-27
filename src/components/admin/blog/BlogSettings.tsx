import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BlogSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración del Blog</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Nombre del Blog</Label>
          <Input placeholder="Blog de Viajes" />
        </div>

        <div className="space-y-2">
          <Label>Descripción</Label>
          <Input placeholder="Descubre los mejores destinos y consejos para viajar" />
        </div>

        <div className="space-y-2">
          <Label>Categorías principales</Label>
          <Input placeholder="Europa, Asia, América, África, Oceanía" />
          <p className="text-sm text-muted-foreground">
            Separa las categorías con comas
          </p>
        </div>
      </CardContent>
    </Card>
  )
}