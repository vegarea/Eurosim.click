import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export function TrackingSettings() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [googleAnalytics, setGoogleAnalytics] = useState("")
  const [facebookPixel, setFacebookPixel] = useState("")
  const [otherScripts, setOtherScripts] = useState("")

  const { data: trackingSettings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('tracking_scripts, id')
        .single()

      if (error) throw error

      if (data?.tracking_scripts) {
        const scripts = data.tracking_scripts as Record<string, string>
        setGoogleAnalytics(scripts.google_analytics || '')
        setFacebookPixel(scripts.facebook_pixel || '')
        setOtherScripts(scripts.other_scripts || '')
      }

      return data
    }
  })

  const updateTrackingSettings = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('site_settings')
        .update({
          tracking_scripts: {
            google_analytics: googleAnalytics,
            facebook_pixel: facebookPixel,
            other_scripts: otherScripts
          }
        })
        .eq('id', trackingSettings?.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] })
      toast({
        title: "Configuración actualizada",
        description: "Los códigos de seguimiento se han actualizado correctamente",
      })
    },
    onError: (error) => {
      toast({
        title: "Error al actualizar",
        description: error.message,
        variant: "destructive",
      })
    }
  })

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Códigos de Seguimiento</h3>
        <p className="text-sm text-muted-foreground">
          Configura los códigos de seguimiento y análisis para tu sitio web
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Google Analytics</CardTitle>
          <CardDescription>
            Añade el código de seguimiento de Google Analytics (gtag.js)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={googleAnalytics}
            onChange={(e) => setGoogleAnalytics(e.target.value)}
            placeholder="<!-- Google Analytics -->"
            className="font-mono text-sm"
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facebook Pixel</CardTitle>
          <CardDescription>
            Añade el código del Pixel de Facebook
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={facebookPixel}
            onChange={(e) => setFacebookPixel(e.target.value)}
            placeholder="<!-- Facebook Pixel Code -->"
            className="font-mono text-sm"
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Otros Scripts</CardTitle>
          <CardDescription>
            Añade otros códigos de seguimiento o scripts personalizados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={otherScripts}
            onChange={(e) => setOtherScripts(e.target.value)}
            placeholder="<!-- Otros scripts -->"
            className="font-mono text-sm"
            rows={6}
          />
        </CardContent>
      </Card>

      <Button 
        onClick={() => updateTrackingSettings.mutate()}
        disabled={updateTrackingSettings.isPending}
      >
        {updateTrackingSettings.isPending ? "Guardando..." : "Guardar cambios"}
      </Button>
    </div>
  )
}