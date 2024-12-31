import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

export default function ThankYou() {
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const sessionId = params.get('session_id')

    if (!sessionId) {
      console.error('No session ID found in URL')
      toast.error("No se encontró información de la orden")
      navigate('/')
      return
    }

    const fetchOrderDetails = async () => {
      try {
        console.log('Fetching order details for session:', sessionId)
        
        // Intentamos hasta 3 veces con un intervalo de 2 segundos
        for (let i = 0; i < 3; i++) {
          const { data, error } = await supabase
            .from('orders')
            .select(`
              *,
              customer:customers(name, email, phone),
              items:order_items(
                quantity,
                unit_price,
                total_price,
                metadata
              )
            `)
            .eq('stripe_payment_intent_id', sessionId)
            .single()

          if (error) {
            console.error('Error fetching order details:', error)
            if (i === 2) { // Si es el último intento
              throw error
            }
          } else if (data) {
            console.log("Order details found:", data)
            setOrderDetails(data)
            setIsLoading(false)
            return
          }

          // Si no hay datos pero no es el último intento, esperamos 2 segundos
          if (i < 2) {
            console.log('Waiting before retry...')
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
        }

        // Si llegamos aquí sin datos después de todos los intentos
        throw new Error('No se encontró la orden después de varios intentos')

      } catch (error) {
        console.error('Error final fetching order details:', error)
        toast.error("Error al obtener los detalles de tu orden")
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [location.search, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Card className="max-w-2xl mx-auto p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Procesando tu orden...</p>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Card className="max-w-2xl mx-auto p-8">
            <div className="text-center">
              <p className="text-gray-600">No se encontró información de la orden</p>
              <Button onClick={() => navigate('/')} className="mt-4">
                Volver al inicio
              </Button>
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
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-gray-600">
              Tu pedido ha sido confirmado y procesado correctamente
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">Detalles del pedido</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Número de orden:</span> {orderDetails.id}</p>
                <p><span className="font-medium">Cliente:</span> {orderDetails.customer?.name}</p>
                <p><span className="font-medium">Email:</span> {orderDetails.customer?.email}</p>
                <p><span className="font-medium">Fecha:</span> {new Date(orderDetails.created_at).toLocaleDateString()}</p>
                {orderDetails.shipping_address && (
                  <div>
                    <p className="font-medium">Dirección de envío:</p>
                    <p className="text-gray-600">
                      {orderDetails.shipping_address.street}<br />
                      {orderDetails.shipping_address.city}, {orderDetails.shipping_address.state}<br />
                      {orderDetails.shipping_address.postal_code}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Productos</h3>
              {orderDetails.items?.map((item: any, index: number) => (
                <div key={index} className="flex justify-between py-2">
                  <div>
                    <p className="font-medium">{item.metadata?.product_title}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${(item.total_price / 100).toFixed(2)} MXN
                  </p>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold">
                    ${(orderDetails.total_amount / 100).toFixed(2)} MXN
                  </p>
                </div>
              </div>
            </div>
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