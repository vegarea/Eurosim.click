import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { DocumentationForm } from "@/components/checkout/DocumentationForm"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

export default function ThankYou() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        toast({
          title: "Error",
          description: "No se encontró la sesión de pago",
          variant: "destructive",
        })
        return
      }

      try {
        // Aquí podríamos verificar el estado de la sesión con Stripe si es necesario
        setLoading(false)
      } catch (error) {
        console.error('Error verificando sesión:', error)
        toast({
          title: "Error",
          description: "Error verificando el pago",
          variant: "destructive",
        })
      }
    }

    verifySession()
  }, [sessionId, toast])

  const handleDocumentationSubmit = async (values: any) => {
    try {
      // Guardar la documentación en la base de datos
      const { error } = await supabase
        .from('customers')
        .update({
          passport_number: values.passportNumber,
          birth_date: values.birthDate,
          gender: values.gender,
        })
        .eq('email', values.email)

      if (error) throw error

      toast({
        title: "¡Éxito!",
        description: "Documentación guardada correctamente",
      })
    } catch (error) {
      console.error('Error guardando documentación:', error)
      toast({
        title: "Error",
        description: "Error guardando la documentación",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Verificando pago...</h2>
          <p className="text-gray-600">Por favor espere un momento</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">¡Gracias por tu compra!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Para completar el proceso, necesitamos algunos datos adicionales para cumplir con la regulación de la UE.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <DocumentationForm
            onSubmit={handleDocumentationSubmit}
            onValidityChange={() => {}}
          />
        </div>
      </div>
    </div>
  )
}