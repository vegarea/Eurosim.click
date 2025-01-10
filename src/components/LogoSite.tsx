import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"

interface LogoSiteProps {
  className?: string
  withLink?: boolean
}

export function LogoSite({ className, withLink = true }: LogoSiteProps) {
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

  const LogoContent = () => (
    <img 
      src={settings?.logo_url || "/logo.png"} 
      alt="Euro Connect" 
      className={className || "h-12 w-auto"}
      loading="eager"
    />
  )

  if (!withLink) {
    return <LogoContent />
  }

  return (
    <Link to="/" className="block">
      <LogoContent />
    </Link>
  )
}