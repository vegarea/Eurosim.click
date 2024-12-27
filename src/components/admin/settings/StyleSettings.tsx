import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Palette, Image as ImageIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function StyleSettings() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios en estilo se han guardado correctamente.",
    })
  }

  const currentImages = [
    {
      id: 1,
      location: "Hero Principal",
      description: "Imagen principal del home, persona usando teléfono",
      currentUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
    },
    {
      id: 2,
      location: "Hero E-SIM",
      description: "Imagen de persona feliz usando su teléfono en la sección de E-SIM",
      currentUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    },
    {
      id: 3,
      location: "Hero SIM Física",
      description: "Imagen de persona feliz usando su teléfono en la sección de SIM física",
      currentUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
    }
  ]

  const handleImageChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Aquí iría la lógica para subir la imagen
      toast({
        title: "Imagen actualizada",
        description: "La nueva imagen se ha guardado correctamente.",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Sección de Colores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Colores del tema
          </CardTitle>
          <CardDescription>
            Personaliza los colores principales de la plataforma
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

      {/* Nueva Sección de Imágenes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Imágenes del sitio
          </CardTitle>
          <CardDescription>
            Gestiona las imágenes principales que se muestran en el sitio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ubicación</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Vista previa</TableHead>
                <TableHead>Cambiar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell className="font-medium">{image.location}</TableCell>
                  <TableCell>{image.description}</TableCell>
                  <TableCell>
                    <img 
                      src={image.currentUrl} 
                      alt={image.description}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById(`image-upload-${image.id}`)?.click()}
                      >
                        Cambiar imagen
                      </Button>
                      <input
                        id={`image-upload-${image.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(image.id, e)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}