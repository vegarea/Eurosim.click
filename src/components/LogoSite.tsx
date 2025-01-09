import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"
import { useState } from "react"

interface LogoSiteProps {
  className?: string;
  withLink?: boolean;
}

export function LogoSite({ className, withLink = true }: LogoSiteProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
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
    <div className="relative">
      {/* Placeholder blur */}
      <div 
        className={`absolute inset-0 bg-gray-200 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className || "h-12 w-auto"}`}
      />
      
      <img 
        src={settings?.logo_url || "/logo.png"} 
        alt="Euro Connect" 
        className={`${className || "h-12 w-auto"} drop-shadow-sm ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={() => setImageLoaded(true)}
        loading="eager" // El logo es crítico, lo cargamos inmediatamente
      />
    </div>
  )

  if (!withLink) {
    return <LogoContent />
  }

  return (
    <Link 
      to="/" 
      className="flex items-center transition-transform hover:scale-105"
    >
      <LogoContent />
    </Link>
  )
}