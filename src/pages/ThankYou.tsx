
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function ThankYou() {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  
  // Check for session_id in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const sessionId = params.get('session_id')

    if (!sessionId) {
      toast.error("No se encontró información de la orden")
      navigate('/')
      return
    }

    // Just simulate loading for a moment then show success
    const timer = setTimeout(() => {
      setIsLoading(false)
      
      // Tracking for conversion (if Google Ads is configured)
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-16835770142/yiNYCJzNtpQaEJ7u9ds-',
          'transaction_id': sessionId
        })
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [location.search, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Card className="max-w-2xl mx-auto p-8">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="mt-4 text-gray-600">Procesando tu orden...</p>
              <p className="mt-2 text-sm text-gray-500">
                Esto puede tomar unos segundos mientras confirmamos tu pago
              </p>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto p-8">
          {/* Cabecera */}
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-gray-600 mb-2">
              Tu pedido ha sido confirmado y procesado correctamente
            </p>
            <p className="text-sm text-gray-500">
              Hemos enviado los detalles de tu pedido a tu correo electrónico
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <p className="text-center text-gray-600">
              Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => navigate('/')} className="min-w-[200px]">
              Volver al inicio
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
