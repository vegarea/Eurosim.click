import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useQueryClient } from "@tanstack/react-query"

interface LogoUploaderProps {
  currentLogo: string | null
}

export function LogoUploader({ currentLogo }: LogoUploaderProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isUploading, setIsUploading] = useState(false)

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      
      // Primero, obtener el ID del registro existente
      const { data: settings, error: fetchError } = await supabase
        .from('site_settings')
        .select('id')
        .maybeSingle()

      if (fetchError) throw fetchError

      // Si no hay registro, crear uno nuevo
      if (!settings) {
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert([{}])
        if (insertError) throw insertError
      }

      // Subir el archivo
      const fileExt = file.name.split('.').pop()
      const fileName = `logo-${Date.now()}.${fileExt}`
      const { error: uploadError, data } = await supabase.storage
        .from('site_assets')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('site_assets')
        .getPublicUrl(fileName)

      // Actualizar el registro con el nuevo logo
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ logo_url: publicUrl })
        .eq('id', settings?.id || '')

      if (updateError) throw updateError

      queryClient.invalidateQueries({ queryKey: ['site-settings'] })

      toast({
        title: "Logo actualizado",
        description: "El nuevo logo se ha guardado correctamente.",
      })
    } catch (error) {
      console.error('Error uploading logo:', error)
      toast({
        title: "Error al actualizar el logo",
        description: "No se pudo guardar el nuevo logo. Por favor, intenta de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg">
        <img 
          src={currentLogo || "/logo.png"} 
          alt="Logo actual" 
          className="max-h-32 object-contain" 
        />
      </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => document.getElementById('logo-upload')?.click()}
          disabled={isUploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? 'Subiendo...' : 'Subir nuevo logo'}
        </Button>
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
          disabled={isUploading}
        />
      </div>
    </>
  )
}