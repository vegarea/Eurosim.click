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
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (session) {
        // Si hay sesión, verificamos que sea un admin o manager
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profile?.role === 'admin' || profile?.role === 'manager') {
          navigate("/admin")
        } else {
          // Si no es admin/manager, actualizamos su rol a admin
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', session.user.id)

          if (updateError) {
            console.error("Error updating role:", updateError)
            toast({
              variant: "destructive",
              title: "Error al actualizar permisos",
              description: "No se pudo asignar permisos de administrador."
            })
            await supabase.auth.signOut()
          } else {
            toast({
              title: "¡Bienvenido!",
              description: "Se te han asignado permisos de administrador."
            })
            navigate("/admin")
          }
        }
      }
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profile?.role === 'admin' || profile?.role === 'manager') {
          navigate("/admin")
        } else {
          // Si es un nuevo usuario, le asignamos rol de admin
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', session.user.id)

          if (updateError) {
            console.error("Error updating role:", updateError)
            toast({
              variant: "destructive",
              title: "Error al actualizar permisos",
              description: "No se pudo asignar permisos de administrador."
            })
            await supabase.auth.signOut()
          } else {
            toast({
              title: "¡Bienvenido!",
              description: "Se te han asignado permisos de administrador."
            })
            navigate("/admin")
          }
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate, toast])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-brand-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Panel de Administración</CardTitle>
          <CardDescription>
            Acceso exclusivo para administradores
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
                }
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}