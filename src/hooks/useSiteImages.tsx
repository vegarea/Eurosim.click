import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export interface SiteImage {
  id: number
  location: string
  description: string
  currentUrl: string
}

export function useSiteImages() {
  return useQuery({
    queryKey: ['site-images'],
    queryFn: async () => {
      const { data: settings } = await supabase
        .from('site_settings')
        .select('hero_images')
        .single()

      const heroImages = settings?.hero_images || {}

      return [
        {
          id: 1,
          location: "Hero Principal",
          description: "Imagen principal del hero",
          currentUrl: heroImages[1]?.url || '/placeholder.svg'
        },
        {
          id: 2,
          location: "Cobertura Europa",
          description: "Imagen de la sección de cobertura en Europa",
          currentUrl: heroImages[2]?.url || '/placeholder.svg'
        },
        {
          id: 3,
          location: "Llamadas Internacionales",
          description: "Imagen de la sección de llamadas internacionales",
          currentUrl: heroImages[3]?.url || '/placeholder.svg'
        }
      ]
    }
  })
}