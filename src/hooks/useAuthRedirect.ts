import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

export function useAuthRedirect() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  useEffect(() => {
    console.log("🔄 Configurando listener de autenticación")
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔔 Evento de autenticación:", event, {
          sessionId: session?.user?.id,
          email: session?.user?.email
        })
        
        if (event === "SIGNED_IN" && session?.user?.id) {
          console.log("✅ Usuario autenticado, verificando permisos")
          
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single()

            if (profileError) {
              console.error("❌ Error al obtener perfil:", profileError)
              throw profileError
            }

            console.log("👤 Perfil de usuario:", profile)

            if (profile?.role === 'admin') {
              console.log("✅ Usuario admin verificado, redirigiendo a:", from)
              navigate(from, { replace: true })
            } else {
              console.error("❌ Usuario no tiene permisos de administrador")
              throw new Error("No tienes permisos de administrador")
            }
          } catch (error) {
            console.error("❌ Error en verificación de permisos:", error)
            await supabase.auth.signOut()
            throw error
          }
        }
      }
    )

    return () => {
      console.log("🧹 Limpiando listener de autenticación")
      subscription.unsubscribe()
    }
  }, [navigate, from])
}