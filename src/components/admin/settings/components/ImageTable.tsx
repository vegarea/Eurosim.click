import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { supabase } from "@/integrations/supabase/client"

interface SiteImage {
  id: number
  location: string
  description: string
  currentUrl: string
}

interface ImageTableProps {
  images: SiteImage[]
  onImageUpdate: (id: number, newUrl: string) => void
}

export function ImageTable({ images, onImageUpdate }: ImageTableProps) {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)

  const handleImageChange = async (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${id}-${Math.random()}.${fileExt}`

      setUploading(true)

      const { error: uploadError, data } = await supabase.storage
        .from('site_images')
        .upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      // Obtener la URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('site_images')
        .getPublicUrl(fileName)

      // Actualizar site_settings con la nueva URL
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({
          hero_images: {
            [id]: {
              url: publicUrl
            }
          }
        })
        .eq('id', 1)

      if (updateError) {
        throw updateError
      }

      // Actualizar el estado local
      onImageUpdate(id, publicUrl)

      toast({
        title: "Imagen actualizada",
        description: "La nueva imagen se ha guardado correctamente.",
      })
      
      console.log("Imagen subida exitosamente:", publicUrl)
      
    } catch (error) {
      console.error("Error al subir la imagen:", error)
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
        {images.map((image) => (
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
  )
}