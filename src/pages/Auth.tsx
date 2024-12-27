import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function Auth() {
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    // Verificar sesión actual
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error("Error checking session:", error)
        toast({
          variant: "destructive",
          title: "Error de autenticación",
          description: "No se pudo verificar tu sesión. Por favor, intenta de nuevo."
        })
        return
      }
      
      if (session) {
        navigate("/admin")
      }
    }

    checkSession()

    // Suscribirse a cambios en el estado de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event)
      
      if (event === "SIGNED_IN") {
        navigate("/admin")
      } else if (event === "SIGNED_OUT") {
        navigate("/auth")
      }
    })

    // Limpiar suscripción
    return () => subscription.unsubscribe()
  }, [navigate, toast])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Bienvenido</CardTitle>
          <CardDescription>
            Inicia sesión o crea una cuenta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupabaseAuth
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
            theme="light"
            providers={[]}
            redirectTo={`${window.location.origin}/auth/callback`}
            localization={{
              variables: {
                sign_in: {
                  email_label: "Correo electrónico",
                  password_label: "Contraseña",
                  button_label: "Iniciar sesión",
                  loading_button_label: "Iniciando sesión...",
                  social_provider_text: "Iniciar sesión con {{provider}}",
                  link_text: "¿Ya tienes una cuenta? Inicia sesión"
                },
                sign_up: {
                  email_label: "Correo electrónico",
                  password_label: "Contraseña",
                  button_label: "Registrarse",
                  loading_button_label: "Registrando...",
                  social_provider_text: "Registrarse con {{provider}}",
                  link_text: "¿No tienes una cuenta? Regístrate"
                },
                magic_link: {
                  email_input_label: "Correo electrónico",
                  button_label: "Enviar enlace mágico",
                  loading_button_label: "Enviando enlace mágico...",
                  link_text: "Enviar enlace mágico al correo"
                }
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}