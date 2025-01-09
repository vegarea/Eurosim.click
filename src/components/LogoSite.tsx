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
    <>
      {/* Placeholder mientras carga */}
      <div 
        className={`${!imageLoaded ? 'block' : 'hidden'} bg-gray-100 animate-pulse ${className || "h-12 w-32"}`}
      />
      
      <img 
        src={settings?.logo_url || "/logo.png"} 
        alt="Euro Connect" 
        className={`${className || "h-12 w-auto"} ${imageLoaded ? 'block' : 'hidden'}`}
        onLoad={() => setImageLoaded(true)}
        loading="eager"
      />
    </>
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