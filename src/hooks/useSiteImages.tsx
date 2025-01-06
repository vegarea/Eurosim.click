import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteImage {
  id: number;
  location: string;
  description: string;
  currentUrl: string;
}

export function useSiteImages() {
  return useQuery({
    queryKey: ['site-images'],
    queryFn: async () => {
      const { data: siteSettings } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      // Definimos las imágenes por defecto
      const defaultImages: SiteImage[] = [
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
          currentUrl: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa",
        }
      ];

      // Si hay configuraciones personalizadas, las usamos
      if (siteSettings?.hero_images) {
        return defaultImages.map(img => ({
          ...img,
          currentUrl: siteSettings.hero_images[img.id]?.url || img.currentUrl
        }));
      }

      return defaultImages;
    }
  });
}