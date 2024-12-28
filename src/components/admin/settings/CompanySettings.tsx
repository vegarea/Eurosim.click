import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Image, Upload, Building2, Phone, Facebook, Instagram } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export function CompanySettings() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isUploading, setIsUploading] = useState(false)
  const [companyName, setCompanyName] = useState("Mi Empresa")
  const [whatsapp, setWhatsapp] = useState("+34600000000")
  const [facebookUrl, setFacebookUrl] = useState("https://facebook.com/")
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com/")

  // Fetch current logo
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('logo_url')
        .single()
      
      if (error) throw error
      return data
    }
  })

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `logo-${Date.now()}.${fileExt}`
      const { error: uploadError, data } = await supabase.storage
        .from('site_assets')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('site_assets')
        .getPublicUrl(fileName)

      // Update site settings with new logo URL
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ logo_url: publicUrl })
        .eq('id', settings?.id)

      if (updateError) throw updateError

      // Invalidate queries to refresh data
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

  const handleSave = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios en identidad de marca se han guardado correctamente.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Identidad de marca
        </CardTitle>
        <CardDescription>
          Personaliza la identidad visual y datos de contacto de tu empresa
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg">
          <img 
            src={settings?.logo_url || "/logo.png"} 
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
        <div className="space-y-2">
          <Label htmlFor="company-name">Nombre de la empresa</Label>
          <Input
            id="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp de atención al cliente</Label>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-green-500" />
            <Input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+34600000000"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebook">Link de Facebook</Label>
          <div className="flex items-center">
            <Facebook className="h-4 w-4 mr-2 text-blue-600" />
            <Input
              id="facebook"
              type="url"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              placeholder="https://facebook.com/tu-pagina"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram">Link de Instagram</Label>
          <div className="flex items-center">
            <Instagram className="h-4 w-4 mr-2 text-pink-600" />
            <Input
              id="instagram"
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/tu-cuenta"
            />
          </div>
        </div>
        <Button onClick={handleSave}>Guardar cambios</Button>
      </CardContent>
    </Card>
  )
}