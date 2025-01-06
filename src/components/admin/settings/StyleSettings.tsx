import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Palette, Image as ImageIcon } from "lucide-react"
import { ImageTable } from "./components/ImageTable"
import { useSiteImages } from "@/hooks/useSiteImages"
import { useQueryClient } from "@tanstack/react-query"

export function StyleSettings() {
  const { data: images, refetch } = useSiteImages()
  const queryClient = useQueryClient()
  const [uploading, setUploading] = useState(false)

  const handleImageUpdate = async (id: number, newUrl: string) => {
    // Invalidar la caché para forzar una recarga de las imágenes
    await queryClient.invalidateQueries({ queryKey: ['site-images'] })
    await refetch()
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
          {images && (
            <ImageTable 
              images={images}
              onImageUpdate={handleImageUpdate}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}