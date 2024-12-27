import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MagicLinkForm } from "@/components/auth/MagicLinkForm"
import { supabase } from "@/integrations/supabase/client"

export default function Auth() {
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate("/admin")
      }
    }

    checkSession()

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/admin")
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <MagicLinkForm />
    </div>
  )
}