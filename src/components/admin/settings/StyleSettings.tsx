import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Palette, Image as ImageIcon, Upload, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export function StyleSettings() {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)

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

  const handleImageChange = async (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${id}-${Math.random()}.${fileExt}`

      setUploading(true)

      const { error: uploadError } = await supabase.storage
        .from('site_images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Obtener la URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('site_images')
        .getPublicUrl(filePath)

      toast({
        title: "Imagen actualizada",
        description: "La nueva imagen se ha guardado correctamente.",
      })

      // Aquí podrías actualizar el estado local o recargar las imágenes
      
    } catch (error) {
      toast({
        title: "Error al subir la imagen",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (id: number) => {
    try {
      // Aquí implementarías la lógica para eliminar la imagen
      toast({
        title: "Imagen eliminada",
        description: "La imagen se ha eliminado correctamente.",
      })
    } catch (error) {
      toast({
        title: "Error al eliminar la imagen",
        description: "No se pudo eliminar la imagen.",
        variant: "destructive",
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ubicación</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Vista previa</TableHead>
                <TableHead>Acciones</TableHead>
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
                        size="sm"
                        onClick={() => document.getElementById(`image-upload-${image.id}`)?.click()}
                        disabled={uploading}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Subir
                      </Button>
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        disabled={uploading}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                      <input
                        id={`image-upload-${image.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(image.id, e)}
                        disabled={uploading}
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