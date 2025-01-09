import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"
import { useState } from "react"

interface LogoSiteProps {
  className?: string
  withLink?: boolean
}

export function LogoSite({ className, withLink = true }: LogoSiteProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [error, setError] = useState(false)
  
  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      console.log("🔄 Fetching site settings for logo")
      const { data, error } = await supabase
        .from('site_settings')
        .select('logo_url')
        .single()
      
      if (error) {
        console.error("❌ Error fetching logo:", error)
        throw error
      }
      console.log("✅ Logo URL fetched:", data?.logo_url)
      return data
    }
  })

  const handleImageLoad = () => {
    console.log("✅ Logo image loaded successfully")
    setImageLoaded(true)
  }

  const handleImageError = () => {
    console.error("❌ Error loading logo image")
    setError(true)
    setImageLoaded(true)
  }

  const LogoContent = () => (
    <>
      {!imageLoaded && !error && (
        <div 
          className={`bg-gray-100 animate-pulse ${className || "h-12 w-32"}`}
          aria-hidden="true"
        />
      )}
      
      <img 
        src={settings?.logo_url || "/logo.png"} 
        alt="Euro Connect" 
        className={`${className || "h-12 w-auto"} ${!imageLoaded ? 'hidden' : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  )

  if (!withLink) {
    return <LogoContent />
  }

  return (
    <Link 
      to="/" 
      className="block transition-transform hover:scale-105"
    >
      <LogoContent />
    </Link>
  )
}