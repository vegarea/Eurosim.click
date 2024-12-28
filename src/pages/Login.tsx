import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/integrations/supabase/client"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          // Verificar si el usuario es admin
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session?.user.id)
            .single()

          if (profile?.role === 'admin') {
            navigate(from, { replace: true })
          } else {
            navigate("/", { replace: true })
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate, from])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="Logo" className="h-8 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-500">Inicia sesión para continuar</p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#0891b2',
                  brandAccent: '#0e7490'
                }
              }
            }
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                button_label: 'Iniciar sesión',
                loading_button_label: 'Iniciando sesión...',
              }
            }
          }}
        />
      </div>
    </div>
  )
}