import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"

export function LogoSite() {
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

  return (
    <Link 
      to="/" 
      className="flex items-center transition-transform hover:scale-105"
    >
      <img 
        src={settings?.logo_url || "/logo.png"} 
        alt="Euro Connect" 
        className="h-12 w-auto drop-shadow-sm" 
      />
    </Link>
  )
}