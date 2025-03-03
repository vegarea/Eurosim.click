
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
import { ThankYouOrder, ThankYouOrderItem, ThankYouCustomer } from "@/types/thankyou"

export default function ThankYou() {
  const [orderDetails, setOrderDetails] = useState<ThankYouOrder | null>(null)
  const [orderItems, setOrderItems] = useState<ThankYouOrderItem[]>([])
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
        
        // Primera consulta: obtener solo los campos específicos que necesitamos de la orden
        // Esto evita inferencias de tipo circulares
        let { data: orderData, error } = await supabase
          .from('orders')
          .select('id, customer_id, status, type, total_amount, payment_method, payment_status, shipping_address, tracking_number, carrier, metadata, created_at')
          .eq('metadata->>stripe_session_id', sessionId)
          .maybeSingle()

        if (!orderData && !error) {
          console.log('Intentando búsqueda alternativa...')
          const { data: altData, error: altError } = await supabase
            .from('orders')
            .select('id, customer_id, status, type, total_amount, payment_method, payment_status, shipping_address, tracking_number, carrier, metadata, created_at')
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

        // Explícitamente convertimos orderData al tipo ThankYouOrder
        const basicOrder: ThankYouOrder = {
          id: orderData.id,
          customer_id: orderData.customer_id,
          status: orderData.status,
          type: orderData.type,
          total_amount: orderData.total_amount,
          payment_method: orderData.payment_method,
          payment_status: orderData.payment_status,
          shipping_address: orderData.shipping_address,
          tracking_number: orderData.tracking_number,
          carrier: orderData.carrier,
          metadata: orderData.metadata,
          created_at: orderData.created_at,
          customer: null
        }

        // Ahora obtenemos los datos del cliente si existe
        let customerData: ThankYouCustomer | null = null
        if (orderData.customer_id) {
          const { data: custData, error: custError } = await supabase
            .from('customers')
            .select('name, email, phone')
            .eq('id', orderData.customer_id)
            .maybeSingle()
          
          if (custError) {
            console.error('Error al buscar el cliente:', custError)
          } else if (custData) {
            customerData = {
              name: custData.name,
              email: custData.email,
              phone: custData.phone
            }
          }
        }

        // Asignamos los datos del cliente a la orden
        const completeOrder: ThankYouOrder = {
          ...basicOrder,
          customer: customerData
        }

        // Segunda consulta: obtener los items de la orden con campos específicos
        if (orderData.id) {
          const { data: itemsData, error: itemsError } = await supabase
            .from('order_items')
            .select('quantity, unit_price, total_price, metadata')
            .eq('order_id', orderData.id)
          
          if (itemsError) {
            console.error('Error al buscar los items:', itemsError)
          } else if (itemsData) {
            // Explícitamente convertimos los items al tipo ThankYouOrderItem[]
            const typedItems: ThankYouOrderItem[] = itemsData.map(item => ({
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price,
              metadata: item.metadata
            }))
            setOrderItems(typedItems)
          }
        }

        // Si es una orden física, obtener el costo de envío
        if (orderData.type === 'physical') {
          const { data: shippingData } = await supabase
            .from('shipping_settings')
            .select('shipping_cost')
            .single()
          
          if (shippingData) {
            setShippingCost(shippingData.shipping_cost)
          }
        }

        console.log("Orden encontrada:", completeOrder)
        setOrderDetails(completeOrder)
        setIsLoading(false)

        // Enviar evento de conversión a Google Ads
        if (window.gtag && orderData) {
          console.log('Enviando evento de conversión a Google Ads')
          window.gtag('event', 'conversion', {
            'send_to': 'AW-16835770142/yiNYCJzNtpQaEJ7u9ds-',
            'value': orderData.total_amount / 100, // Convertir de centavos a unidades
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
            items={orderItems}
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
