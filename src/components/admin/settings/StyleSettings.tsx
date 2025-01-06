import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Palette, Image as ImageIcon } from "lucide-react"
import { ImageTable } from "./components/ImageTable"

export function StyleSettings() {
  const [currentImages, setCurrentImages] = useState([
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
  ])

  const handleImageUpdate = (id: number, newUrl: string) => {
    setCurrentImages(prevImages =>
      prevImages.map(img =>
        img.id === id ? { ...img, currentUrl: newUrl } : img
      )
    )
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
          <Button onClick={() => {}} disabled>Guardar cambios</Button>
        </CardContent>
      </Card>

      {/* Sección de Imágenes */}
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
          <ImageTable 
            images={currentImages}
            onImageUpdate={handleImageUpdate}
          />
        </CardContent>
      </Card>
    </div>
  )
}