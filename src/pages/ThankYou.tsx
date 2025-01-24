import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 as Loader2Icon } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { OrderConfirmationHeader } from "@/components/thankyou/OrderConfirmationHeader"
import { OrderDetails } from "@/components/thankyou/OrderDetails"
import { OrderItems } from "@/components/thankyou/OrderItems"
import type { Database } from "@/integrations/supabase/types"
import type { UIOrder } from "@/types/ui/orders"

type DbOrder = Database["public"]["Tables"]["orders"]["Row"]
type DbCustomer = Database["public"]["Tables"]["customers"]["Row"]
type DbOrderItem = Database["public"]["Tables"]["order_items"]["Row"]

interface OrderResponse extends DbOrder {
  customer: Pick<DbCustomer, "name" | "email" | "phone"> | null
  items: DbOrderItem[] | null
}

export default function ThankYou() {
  const [orderDetails, setOrderDetails] = useState<OrderResponse | null>(null)
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
        
        const { data: orderData, error } = await supabase
          .from('orders')
          .select(`
            id,
            customer_id,
            product_id,
            status,
            type,
            total_amount,
            quantity,
            payment_method,
            payment_status,
            stripe_payment_intent_id,
            stripe_receipt_url,
            paypal_order_id,
            paypal_receipt_url,
            shipping_address,
            tracking_number,
            carrier,
            activation_date,
            notes,
            metadata,
            created_at,
            updated_at,
            customer:customers(name, email, phone),
            items:order_items(
              id,
              order_id,
              product_id,
              quantity,
              unit_price,
              total_price,
              metadata,
              created_at,
              updated_at
            )
          `)
          .eq('metadata->stripe_session_id', sessionId)
          .maybeSingle()

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

  const orderToUI = (order: OrderResponse): UIOrder => {
    return {
      ...order,
      customer: order.customer ? {
        id: order.customer_id || '', // Usamos el customer_id de la orden
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        passport_number: null,
        birth_date: null,
        gender: null,
        default_shipping_address: null,
        billing_address: null,
        preferred_language: null,
        marketing_preferences: null,
        stripe_customer_id: null,
        paypal_customer_id: null,
        metadata: null,
        created_at: null,
        updated_at: null
      } : undefined,
      items: order.items || undefined
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Card className="max-w-2xl mx-auto p-8">
            <div className="text-center">
              <Loader2Icon className="h-12 w-12 animate-spin text-primary mx-auto" />
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

  const uiOrder = orderToUI(orderDetails)

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <Card className="max-w-2xl mx-auto p-8">
          <OrderConfirmationHeader 
            customerEmail={orderDetails.customer?.email || ''} 
          />

          <OrderDetails order={uiOrder} />
          
          <OrderItems 
            order={uiOrder}
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