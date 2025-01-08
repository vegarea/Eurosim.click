import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"

interface LogoSiteProps {
  className?: string;
}

export function LogoSite({ className }: LogoSiteProps) {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('logo_url')
        .single()
      
      if (error) {
        console.error('Error fetching logo:', error)
        return null
      }
      return data
    },
    initialData: { logo_url: "/logo.png" } // Proporcionar un valor inicial
  })

  return (
    <Link 
      to="/" 
      className="flex items-center transition-transform hover:scale-105"
    >
      <img 
        src={settings?.logo_url || "/logo.png"} 
        alt="Euro Connect" 
        className={className || "h-12 w-auto"}
        onError={(e) => {
          // Si hay un error al cargar la imagen, usar el logo por defecto
          const target = e.target as HTMLImageElement;
          target.src = "/logo.png";
        }}
      />
    </Link>
  )
}