import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/integrations/supabase/client"
import { LogoSite } from "@/components/LogoSite"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AuthError, AuthApiError } from "@supabase/supabase-js"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event)
        
        if (event === "SIGNED_IN") {
          setIsLoading(true)
          try {
            if (!session?.user?.id) {
              console.error("No user ID found in session")
              throw new Error("No user ID found")
            }

            // Verificar si el usuario es admin
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single()

            if (profileError) {
              console.error("Error fetching profile:", profileError)
              throw profileError
            }

            if (profile?.role === 'admin') {
              navigate(from, { replace: true })
            } else {
              setError("No tienes permisos de administrador")
              await supabase.auth.signOut()
            }
          } catch (err) {
            console.error("Error checking profile:", err)
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
            await supabase.auth.signOut()
          } finally {
            setIsLoading(false)
          }
        }
        
        if (event === "SIGNED_OUT") {
          setError("")
          setIsLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
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
          <Alert className="mb-6">
            <AlertDescription>Verificando credenciales...</AlertDescription>
          </Alert>
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