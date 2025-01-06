import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface SiteImage {
  id: number
  url: string
}

interface ImageTableProps {
  images: SiteImage[]
  onImageUpdate: (id: number, newUrl: string) => void
  siteSettingsId: string
}

export function ImageTable({ images, onImageUpdate, siteSettingsId }: ImageTableProps) {
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (id: number, file: File) => {
    try {
      setUploading(true)
      
      const fileName = `${crypto.randomUUID()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('site_images')
        .upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase
        .storage
        .from('site_images')
        .getPublicUrl(fileName)

      // Obtener el valor actual de hero_images
      const { data: currentSettings, error: fetchError } = await supabase
        .from('site_settings')
        .select('hero_images')
        .eq('id', siteSettingsId)
        .single()

      if (fetchError) {
        throw fetchError
      }

      const currentHeroImages = currentSettings?.hero_images || {}
      
      // Combinar los valores existentes con el nuevo
      const updatedHeroImages = {
        ...currentHeroImages,
        [id]: {
          url: publicUrl
        }
      }

      // Actualizar site_settings con la nueva URL
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({
          hero_images: updatedHeroImages
        })
        .eq('id', siteSettingsId)

      if (updateError) {
        throw updateError
      }

      onImageUpdate(id, publicUrl)
      toast.success('Imagen actualizada correctamente')
    } catch (error) {
      console.error('Error al subir la imagen:', error)
      toast.error('Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {images.map(image => (
        <div key={image.id} className="flex items-center justify-between">
          <img src={image.url} alt={`Image ${image.id}`} className="w-32 h-32 object-cover" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                handleImageUpload(image.id, e.target.files[0])
              }
            }}
            disabled={uploading}
          />
        </div>
      ))}
    </div>
  )
}
