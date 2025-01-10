import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface LogoSiteProps {
  className?: string
  withLink?: boolean
}

export function LogoSite({ className, withLink = true }: LogoSiteProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  
  const { data: settings, isLoading, refetch } = useQuery({
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
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 10000)
  })

  // Reintentar carga de imagen si falla
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        console.log(`🔄 Retrying logo load attempt ${retryCount + 1}`)
        setError(false)
        setImageLoaded(false)
        setRetryCount(prev => prev + 1)
        refetch()
      }, 1000 * Math.pow(2, retryCount))

      return () => clearTimeout(timer)
    }
  }, [error, retryCount, refetch])

  const handleImageLoad = () => {
    console.log("✅ Logo image loaded successfully")
    setImageLoaded(true)
    setError(false)
  }

  const handleImageError = () => {
    console.error("❌ Error loading logo image")
    setError(true)
    setImageLoaded(true)
  }

  const LogoContent = () => (
    <div className="relative">
      {/* Skeleton loader */}
      {(!imageLoaded || isLoading) && !error && (
        <div className="flex items-center space-x-2">
          <div 
            className={`bg-gray-100 animate-pulse ${className || "h-12 w-32"}`}
            aria-hidden="true"
          />
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        </div>
      )}
      
      {/* Logo image */}
      <img 
        src={settings?.logo_url || "/logo.png"} 
        alt="Euro Connect" 
        className={`${className || "h-12 w-auto"} ${!imageLoaded ? 'hidden' : ''} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="eager"
        fetchPriority="high"
      />

      {/* Fallback para error */}
      {error && (
        <div className={`flex items-center justify-center border border-gray-200 rounded ${className || "h-12 w-32"}`}>
          <span className="text-sm text-gray-500">Euro Connect</span>
        </div>
      )}
    </div>
  )

  if (!withLink) {
    return <LogoContent />
  }

  return (
    <Link 
      to="/" 
      className="block transition-transform hover:scale-105"
      aria-label="Go to homepage"
    >
      <LogoContent />
    </Link>
  )
}