import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { Loader2 } from "lucide-react"

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setIsLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      setIsAdmin(profile?.role === 'admin')
      setIsLoading(false)
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}