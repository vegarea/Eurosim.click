
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { formatCurrency } from "@/utils/currency"
import { BasicOrderInfo, BasicCustomerInfo, BasicOrderItem } from "@/types/thankyou"

export default function ThankYou() {
  const [isLoading, setIsLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0)
  const [orderInfo, setOrderInfo] = useState<BasicOrderInfo | null>(null)
  const [customerInfo, setCustomerInfo] = useState<BasicCustomerInfo | null>(null)
  const [orderItems, setOrderItems] = useState<BasicOrderItem[]>([])
  const [shippingCost, setShippingCost] = useState<number>(0)
  
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
        
        // 1. Primero obtenemos la información básica de la orden
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('id, status, total_amount, created_at, payment_method, payment_status, type, customer_id, metadata')
          .eq('metadata->>stripe_session_id', sessionId)
          .maybeSingle()

        if (orderError) throw orderError
        
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

        // Convertimos a nuestro tipo simplificado
        const basicOrder: BasicOrderInfo = {
          id: orderData.id,
          status: orderData.status,
          total_amount: orderData.total_amount,
          created_at: orderData.created_at,
          payment_method: orderData.payment_method,
          payment_status: orderData.payment_status,
          type: orderData.type
        }
        
        setOrderInfo(basicOrder)

        // 2. Si hay customer_id, obtenemos datos del cliente en una consulta separada
        if (orderData.customer_id) {
          const { data: customerData, error: customerError } = await supabase
            .from('customers')
            .select('name, email, phone')
            .eq('id', orderData.customer_id)
            .maybeSingle()
          
          if (!customerError && customerData) {
            setCustomerInfo({
              name: customerData.name,
              email: customerData.email,
              phone: customerData.phone
            })
          }
        }

        // 3. Obtenemos los items de la orden en una consulta separada
        if (orderData.id) {
          const { data: itemsData, error: itemsError } = await supabase
            .from('order_items')
            .select('quantity, unit_price, total_price, metadata')
            .eq('order_id', orderData.id)
          
          if (!itemsError && itemsData) {
            const simplifiedItems = itemsData.map(item => ({
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price,
              product_title: item.metadata?.product_title || 'Producto'
            }))
            setOrderItems(simplifiedItems)
          }
        }

        // 4. Si es una orden física, obtenemos el costo de envío
        if (orderData.type === 'physical') {
          const { data: shippingData } = await supabase
            .from('shipping_settings')
            .select('shipping_cost')
            .single()
          
          if (shippingData) {
            setShippingCost(shippingData.shipping_cost)
          }
        }

        // Enviar evento de conversión a Google Ads
        if (window.gtag && orderData) {
          console.log('Enviando evento de conversión a Google Ads')
          window.gtag('event', 'conversion', {
            'send_to': 'AW-16835770142/yiNYCJzNtpQaEJ7u9ds-',
            'value': orderData.total_amount / 100,
            'currency': 'MXN',
            'transaction_id': orderData.id
          })
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error al obtener detalles de la orden:', error)
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

  if (!orderInfo) {
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
          {/* Cabecera */}
          <div className="text-center mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ¡Gracias por tu compra!
            </h1>
            <p className="text-gray-600 mb-2">
              Tu pedido ha sido confirmado y procesado correctamente
            </p>
            {customerInfo?.email && (
              <p className="text-sm text-gray-500">
                Hemos enviado los detalles de tu pedido a: <span className="font-medium">{customerInfo.email}</span>
              </p>
            )}
          </div>

          {/* Detalles del pedido */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Detalles del pedido</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Número de orden:</span> {orderInfo.id}</p>
              {customerInfo?.name && <p><span className="font-medium">Cliente:</span> {customerInfo.name}</p>}
              {customerInfo?.email && <p><span className="font-medium">Email:</span> {customerInfo.email}</p>}
              <p><span className="font-medium">Fecha:</span> {orderInfo.created_at ? new Date(orderInfo.created_at).toLocaleDateString() : 'N/A'}</p>
              <p><span className="font-medium">Estado del pago:</span> {orderInfo.payment_status}</p>
            </div>
          </div>

          {/* Productos */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Productos</h3>
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <div>
                  <p className="font-medium">{item.product_title}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-medium">
                  {formatCurrency(item.total_price)}
                </p>
              </div>
            ))}
            
            {orderInfo.type === 'physical' && shippingCost > 0 && (
              <div className="flex justify-between py-2 border-t border-gray-100 mt-2">
                <p className="font-medium">Costo de envío</p>
                <p className="font-medium">
                  {formatCurrency(shippingCost)}
                </p>
              </div>
            )}

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">
                  {formatCurrency(orderInfo.total_amount)}
                </p>
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
