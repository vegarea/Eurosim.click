import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"

interface LogoSiteProps {
  className?: string;
}

export function LogoSite({ className }: LogoSiteProps) {
  const defaultLogo = "logo.png"; // Removido el slash inicial

  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('logo_url')
        .maybeSingle()
      
      if (error) {
        console.error('Error fetching logo:', error)
        return { logo_url: defaultLogo }
      }
      
      return data || { logo_url: defaultLogo }
    }
  })

  return (
    <Link 
      to="/" 
      className="flex items-center transition-transform hover:scale-105"
    >
      <img 
        src={settings?.logo_url || defaultLogo}
        alt="Euro Connect" 
        className={className || "h-12 w-auto"}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = defaultLogo;
          console.log('Logo fallback to default:', target.src);
        }}
      />
    </Link>
  )
}