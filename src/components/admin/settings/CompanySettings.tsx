import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { LogoUploader } from "./components/LogoUploader"
import { SocialMediaInputs } from "./components/SocialMediaInputs"
import React, { useState, useEffect } from "react"

export function CompanySettings() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)

  // Fetch current settings
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .maybeSingle()
      
      if (error) throw error
      return data
    }
  })

  const [companyName, setCompanyName] = useState(settings?.company_name || "Mi Empresa")
  const [whatsapp, setWhatsapp] = useState(settings?.whatsapp_number || "+34600000000")
  const [facebookUrl, setFacebookUrl] = useState(settings?.facebook_url || "https://facebook.com/")
  const [instagramUrl, setInstagramUrl] = useState(settings?.instagram_url || "https://instagram.com/")
  const [youtubeUrl, setYoutubeUrl] = useState(settings?.youtube_url || "https://youtube.com/")
  const [tiktokUrl, setTiktokUrl] = useState(settings?.tiktok_url || "https://tiktok.com/")

  // Update state when settings are loaded
  useEffect(() => {
    if (settings) {
      setCompanyName(settings.company_name || "Mi Empresa")
      setWhatsapp(settings.whatsapp_number || "+34600000000")
      setFacebookUrl(settings.facebook_url || "https://facebook.com/")
      setInstagramUrl(settings.instagram_url || "https://instagram.com/")
      setYoutubeUrl(settings.youtube_url || "https://youtube.com/")
      setTiktokUrl(settings.tiktok_url || "https://tiktok.com/")
    }
  }, [settings])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      
      // Get the ID of the first record if it exists
      const { data: existingSettings, error: fetchError } = await supabase
        .from('site_settings')
        .select('id')
        .maybeSingle()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: existingSettings?.id || undefined, // Use existing ID if available
          company_name: companyName,
          whatsapp_number: whatsapp,
          facebook_url: facebookUrl,
          instagram_url: instagramUrl,
          youtube_url: youtubeUrl,
          tiktok_url: tiktokUrl
        }, {
          onConflict: 'id'
        })

      if (error) throw error

      queryClient.invalidateQueries({ queryKey: ['site-settings'] })

      toast({
        title: "Cambios guardados",
        description: "Los cambios en identidad de marca se han guardado correctamente.",
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error al guardar",
        description: "No se pudieron guardar los cambios. Por favor, intenta de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
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
        <LogoUploader currentLogo={settings?.logo_url} />
        
        <div className="space-y-2">
          <Label htmlFor="company-name">Nombre de la empresa</Label>
          <Input
            id="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <SocialMediaInputs 
          whatsapp={whatsapp}
          setWhatsapp={setWhatsapp}
          facebookUrl={facebookUrl}
          setFacebookUrl={setFacebookUrl}
          instagramUrl={instagramUrl}
          setInstagramUrl={setInstagramUrl}
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          tiktokUrl={tiktokUrl}
          setTiktokUrl={setTiktokUrl}
        />

        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  )
}