import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export function TrackingScripts() {
  const { data: siteSettings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('tracking_scripts')
        .single()

      if (error) throw error
      return data
    }
  })

  useEffect(() => {
    if (!siteSettings?.tracking_scripts) return

    const scripts = siteSettings.tracking_scripts as Record<string, string>

    // Insertar Google Analytics
    if (scripts.google_analytics) {
      const gaScript = document.createElement('script')
      gaScript.innerHTML = scripts.google_analytics
      document.head.appendChild(gaScript)
    }

    // Insertar Facebook Pixel
    if (scripts.facebook_pixel) {
      const fbScript = document.createElement('script')
      fbScript.innerHTML = scripts.facebook_pixel
      document.head.appendChild(fbScript)
    }

    // Insertar otros scripts
    if (scripts.other_scripts) {
      const otherScript = document.createElement('script')
      otherScript.innerHTML = scripts.other_scripts
      document.head.appendChild(otherScript)
    }

    // Cleanup al desmontar
    return () => {
      document.head.querySelectorAll('script').forEach(script => {
        if (script.innerHTML.includes('gtag') || 
            script.innerHTML.includes('fbq') || 
            scripts.other_scripts?.includes(script.innerHTML)) {
          script.remove()
        }
      })
    }
  }, [siteSettings?.tracking_scripts])

  return null
}