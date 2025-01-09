import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/integrations/supabase/client"
import { LogoSite } from "@/components/LogoSite"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthError, AuthApiError } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log("🔄 Configurando listener de autenticación")
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("🔔 Evento de autenticación:", event, {
          sessionId: session?.user?.id,
          email: session?.user?.email
        })
        
        if (event === "SIGNED_IN") {
          console.log("✅ Usuario autenticado, verificando permisos")
          setIsLoading(true)
          
          try {
            if (!session?.user?.id) {
              console.error("❌ No se encontró ID de usuario en la sesión")
              throw new Error("No se encontró ID de usuario")
            }

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
              setError("No tienes permisos de administrador")
              await supabase.auth.signOut()
            }
          } catch (err) {
            console.error("❌ Error en el proceso de autenticación:", err)
            
            if (err instanceof AuthApiError) {
              switch (err.status) {
                case 400:
                  setError("Email o contraseña incorrectos")
                  break
                case 401:
                  setError("No estás autorizado para acceder")
                  break
                case 404:
                  setError("Usuario no encontrado")
                  break
                default:
                  setError("Error de autenticación. Por favor, intenta de nuevo.")
              }
            } else {
              setError("Error verificando permisos de usuario")
            }
            
            try {
              console.log("🔄 Cerrando sesión debido a error")
              await supabase.auth.signOut()
            } catch (signOutError) {
              console.error("❌ Error al cerrar sesión:", signOutError)
            }
          } finally {
            setIsLoading(false)
          }
        }
        
        if (event === "SIGNED_OUT") {
          console.log("👋 Usuario cerró sesión")
          setError("")
          setIsLoading(false)
        }
      }
    )

    return () => {
      console.log("🧹 Limpiando listener de autenticación")
      subscription.unsubscribe()
    }
  }, [navigate, from])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-brand-100 p-8">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <LogoSite className="h-12" withLink={false} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-500">Inicia sesión para continuar</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="flex items-center justify-center gap-2 mb-6 text-primary">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Verificando credenciales...</span>
          </div>
        )}
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#E02653',
                  brandAccent: '#c71f47',
                  brandButtonText: 'white',
                  defaultButtonBackground: 'white',
                  defaultButtonBackgroundHover: '#f9f9f9',
                  defaultButtonBorder: 'lightgray',
                  defaultButtonText: 'gray',
                  dividerBackground: '#e9e9e9',
                  inputBackground: 'transparent',
                  inputBorder: 'lightgray',
                  inputBorderHover: '#E02653',
                  inputBorderFocus: '#E02653',
                  inputText: 'black',
                  inputLabelText: 'gray'
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px'
                },
                radii: {
                  borderRadiusButton: '0.5rem',
                  buttonBorderRadius: '0.5rem',
                  inputBorderRadius: '0.5rem'
                }
              }
            },
            style: {
              button: { 
                border: 'none',
                fontWeight: '500'
              },
              anchor: { 
                color: '#E02653',
                fontWeight: '500'
              },
              message: { 
                color: '#E02653'
              }
            }
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                email_input_placeholder: 'tu@email.com',
                password_input_placeholder: 'Tu contraseña',
                button_label: 'Iniciar sesión',
                loading_button_label: 'Iniciando sesión...',
                social_provider_text: 'Iniciar sesión con {{provider}}',
                link_text: '¿Ya tienes una cuenta? Inicia sesión'
              },
              sign_up: {
                email_label: 'Correo electrónico',
                password_label: 'Contraseña',
                email_input_placeholder: 'tu@email.com',
                password_input_placeholder: 'Tu contraseña',
                button_label: 'Registrarse',
                loading_button_label: 'Registrando...',
                social_provider_text: 'Registrarse con {{provider}}',
                link_text: '¿No tienes una cuenta? Regístrate'
              }
            }
          }}
        />
      </div>
    </div>
  )
}