import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Order } from "@/types/database/orders"
import { OrderEvent } from "@/types/database/common"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { OrderBasicInfo } from "@/components/admin/orders/OrderBasicInfo"
import { OrderProductInfo } from "@/components/admin/orders/OrderProductInfo"
import { OrderNotes } from "@/components/admin/orders/OrderNotes"
import { OrderDocumentation } from "@/components/admin/orders/OrderDocumentation"
import { OrderStatusControl } from "@/components/admin/orders/OrderStatusControl"
import { OrderHistory } from "@/components/admin/orders/OrderHistory"
import { OrderStatus } from "@/types/database/enums"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { Progress } from "@/components/ui/progress"
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge"
import { OrderPaymentInfo } from "@/components/admin/orders/OrderPaymentInfo"
import { OrderCustomerInfo } from "@/components/admin/orders/OrderCustomerInfo"

const statusOrder = [
  "payment_pending",
  "processing",
  "shipped",
  "delivered",
] as const

// Mock payment data - In a real app, this would come from your payment provider's API
const mockPaymentData = {
  paymentUrl: "https://checkout.stripe.com/c/pay/cs_test_...",
  logs: [
    { date: "2024-01-25T10:30:00Z", event: "payment.created", status: "pending" },
    { date: "2024-01-25T10:31:00Z", event: "payment.succeeded", status: "completed" }
  ]
}

export default function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>()
  const [isUpdating, setIsUpdating] = useState(false)

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(*),
          events:order_events(*)
        `)
        .eq('id', orderId)
        .single()

      if (error) throw error
      return data as Order & { events: OrderEvent[] }
    }
  })

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order || isUpdating) return

    setIsUpdating(true)
    try {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', order.id)

      if (updateError) throw updateError

      const { error: eventError } = await supabase
        .from('order_events')
        .insert({
          order_id: order.id,
          type: 'status_changed',
          description: `Estado actualizado a: ${newStatus}`,
          metadata: {
            old_status: order.status,
            new_status: newStatus
          }
        })

      if (eventError) throw eventError

      toast.success('Estado actualizado correctamente')
    } catch (error) {
      console.error('Error al actualizar estado:', error)
      toast.error('Error al actualizar el estado')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddNote = async (text: string) => {
    if (!order) return

    try {
      const { error } = await supabase
        .from('order_events')
        .insert({
          order_id: order.id,
          type: 'note_added',
          description: text,
          metadata: {
            automated: false
          }
        })

      if (error) throw error
      toast.success('Nota añadida correctamente')
    } catch (error) {
      console.error('Error al añadir nota:', error)
      toast.error('Error al añadir la nota')
    }
  }

  const getProgressPercentage = () => {
    const currentIndex = statusOrder.indexOf(order?.status as any)
    if (currentIndex === -1) return 0
    return ((currentIndex + 1) / statusOrder.length) * 100
  }

  const formatDateTime = (date: string | null) => {
    if (!date) return "No especificado"
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div>Cargando...</div>
      </AdminLayout>
    )
  }

  if (error || !order) {
    return (
      <AdminLayout>
        <div>Error al cargar el pedido</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header y Navegación */}
        <div className="flex items-center justify-between">
          <Link to="/admin/orders">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Volver a pedidos
            </Button>
          </Link>
        </div>

        {/* Estado del Pedido y Progreso */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Pedido {order.id}</h1>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              {statusOrder.map((status) => (
                <span key={status} className="capitalize">
                  {status.replace('_', ' ')}
                </span>
              ))}
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>
              Creado: {formatDateTime(order.created_at)}
            </div>
            {order.stripe_payment_intent_id && (
              <a
                href={order.stripe_receipt_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                Ver en Stripe <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Información del Cliente y Control de Estado */}
        <div className="grid gap-6 md:grid-cols-2">
          <OrderCustomerInfo order={order} />
          <OrderStatusControl
            currentStatus={order.status}
            orderType={order.type}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Información Básica y del Producto */}
        <div className="grid gap-6 md:grid-cols-2">
          <OrderBasicInfo order={order} />
          <OrderProductInfo order={order} />
        </div>

        {/* Información de Pago y Documentación */}
        <div className="grid gap-6 md:grid-cols-2">
          <OrderPaymentInfo order={order} paymentData={mockPaymentData} />
          <OrderDocumentation order={order} />
        </div>

        {/* Notas e Historial */}
        <div className="grid gap-6 md:grid-cols-2">
          <OrderNotes 
            order={order} 
            onAddNote={handleAddNote}
          />
          <OrderHistory events={order.events || []} />
        </div>
      </div>
    </AdminLayout>
  )
}