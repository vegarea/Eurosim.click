import { useState } from "react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/integrations/supabase/client"
import { AuthError, AuthApiError } from "@supabase/supabase-js"
import { AuthContainer } from "@/components/auth/AuthContainer"
import { AuthError as AuthErrorComponent } from "@/components/auth/AuthError"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"

export default function Login() {
  const [error, setError] = useState<string>("")
  useAuthRedirect()

  const handleAuthError = (error: AuthError) => {
    console.error("❌ Error de autenticación:", error)
    
    if (error instanceof AuthApiError) {
      switch (error.status) {
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
          setError(error.message)
      }
    } else {
      setError("Error de autenticación. Por favor, intenta de nuevo.")
    }
  }

  return (
    <AuthContainer>
      <AuthErrorComponent message={error} />
      
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
            button: { border: 'none', fontWeight: '500' },
            anchor: { color: '#E02653', fontWeight: '500' },
            message: { color: '#E02653' }
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
        onError={handleAuthError}
      />
    </AuthContainer>
  )
}