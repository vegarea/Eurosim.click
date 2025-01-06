import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Order } from "@/types/database/orders"
import { OrderEvent } from "@/types/database/common"
import { OrderBasicInfo } from "@/components/admin/orders/OrderBasicInfo"
import { OrderProductInfo } from "@/components/admin/orders/OrderProductInfo"
import { OrderNotes } from "@/components/admin/orders/OrderNotes"
import { OrderDocumentation } from "@/components/admin/orders/OrderDocumentation"
import { OrderStatusControl } from "@/components/admin/orders/OrderStatusControl"
import { OrderHistory } from "@/components/admin/orders/OrderHistory"
import { OrderStatus } from "@/types/database/enums"
import { toast } from "sonner"

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

      // Registrar el evento de cambio de estado
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
    } catch (error) {
      console.error('Error al añadir nota:', error)
      toast.error('Error al añadir la nota')
    }
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error || !order) {
    return <div>Error al cargar el pedido</div>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <OrderStatusControl
          currentStatus={order.status}
          orderType={order.type}
          onStatusChange={handleStatusChange}
        />
        <OrderBasicInfo order={order} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <OrderProductInfo order={order} />
        <OrderDocumentation order={order} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <OrderNotes 
          order={order} 
          onAddNote={handleAddNote}
        />
        <OrderHistory events={order.events || []} />
      </div>
    </div>
  )
}