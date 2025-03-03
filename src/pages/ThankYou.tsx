import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { OrderConfirmationHeader } from "@/components/thankyou/OrderConfirmationHeader"
import { OrderDetails } from "@/components/thankyou/OrderDetails"
import { OrderItems } from "@/components/thankyou/OrderItems"

export default function ThankYou() {
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [shippingCost, setShippingCost] = useState<number>()
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
        console.log('Intento', retryCount + 1, 'de obtener detalles de la orden para sesión:', sessionId)
        
        interface OrderData {
          id: string;
          type: string;
          total_amount: number;
          metadata: Record<string, any>;
          customer: {
            name: string;
            email: string;
            phone: string;
          } | null;
          items: {
            quantity: number;
            unit_price: number;
            total_price: number;
            metadata: Record<string, any>;
          }[];
        }
        
        let { data: orderData, error } = await supabase
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
          .eq('metadata->>stripe_session_id', sessionId)
          .maybeSingle()

        if (!orderData && !error) {
          console.log('Intentando búsqueda alternativa...')
          const { data: altData, error: altError } = await supabase
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
            .eq('metadata->stripe_session_id', sessionId)
            .maybeSingle()

          if (altError) throw altError
          orderData = altData
        }

        if (error) {
          console.error('Error al buscar la orden:', error)
          throw error
        }

        if (!orderData && retryCount < 5) {
          console.log('Orden no encontrada, reintentando en 3 segundos...')
          setRetryCount(prev => prev + 1)
          setTimeout(() => {
            setIsLoading(true)
          }, 3000)
          return
        }

        if (!orderData) {
          throw new Error('No se encontró la orden después de varios intentos')
        }

        if (orderData.type === 'physical') {
          const { data: shippingData } = await supabase
            .from('shipping_settings')
            .select('shipping_cost')
            .single()
          
          if (shippingData) {
            setShippingCost(shippingData.shipping_cost)
          }
        }

        console.log("Orden encontrada:", orderData)
        setOrderDetails(orderData)
        setIsLoading(false)

        if (window.gtag && orderData) {
          console.log('Enviando evento de conversión a Google Ads')
          window.gtag('event', 'conversion', {
            'send_to': 'AW-16835770142/yiNYCJzNtpQaEJ7u9ds-',
            'value': orderData.total_amount / 100,
            'currency': 'MXN',
            'transaction_id': orderData.id
          })
        }

      } catch (error) {
        console.error('Error final al obtener detalles de la orden:', error)
        toast.error("Error al obtener los detalles de tu orden")
        setIsLoading(false)
      }
    }

    if (isLoading) {
      fetchOrderDetails()
    }
  }, [location.search, navigate, retryCount, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Card className="max-w-2xl mx-auto p-8">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="mt-4 text-gray-600">
                {retryCount > 0 
                  ? `Procesando tu orden... (intento ${retryCount + 1} de 6)`
                  : 'Procesando tu orden...'}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Esto puede tomar unos segundos mientras confirmamos tu pago
              </p>
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
          <OrderConfirmationHeader 
            customerEmail={orderDetails?.customer?.email || ''} 
          />

          <OrderDetails order={orderDetails} />
          
          <OrderItems 
            order={orderDetails}
            shippingCost={shippingCost}
          />

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
