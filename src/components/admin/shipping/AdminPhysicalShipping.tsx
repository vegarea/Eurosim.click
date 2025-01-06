import { useState } from "react"
import { useOrders } from "@/contexts/OrdersContext"
import { Order } from "@/types/database/orders"
import { OrderStatus } from "@/types/database/enums"
import { ShippingConfirmDialog } from "./ShippingConfirmDialog"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { OrderEvent } from "@/types/database/common"

export function AdminPhysicalShipping() {
  const { orders, refetchOrders } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const physicalOrders = orders.filter(
    order => order.type === "physical" && 
    ["processing", "shipped"].includes(order.status)
  )

  const handleConfirmShipment = async (
    orderId: string, 
    trackingNumber: string, 
    carrier: string
  ) => {
    try {
      setIsUpdating(true)

      // Actualizar la orden
      const { error: orderError } = await supabase
        .from('orders')
        .update({
          status: 'shipped' as OrderStatus,
          tracking_number: trackingNumber,
          carrier: carrier
        })
        .eq('id', orderId)

      if (orderError) throw orderError

      // Crear evento de envío
      const shippingEvent: Omit<OrderEvent, "id"> = {
        order_id: orderId,
        type: "shipping_updated",
        description: `Pedido enviado con ${carrier}. Número de seguimiento: ${trackingNumber}`,
        metadata: {
          carrier,
          tracking_number: trackingNumber,
          automated: false
        },
        created_at: new Date().toISOString()
      }

      const { error: eventError } = await supabase
        .from('order_events')
        .insert(shippingEvent)

      if (eventError) throw eventError

      await refetchOrders()
      toast.success("Envío confirmado correctamente")
      setShowConfirmDialog(false)
    } catch (error) {
      console.error('Error al confirmar envío:', error)
      toast.error("Error al confirmar el envío")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleConfirmDelivery = async (orderId: string) => {
    try {
      setIsUpdating(true)

      // Actualizar estado de la orden
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: 'delivered' as OrderStatus })
        .eq('id', orderId)

      if (orderError) throw orderError

      // Crear evento de entrega
      const deliveryEvent: Omit<OrderEvent, "id"> = {
        order_id: orderId,
        type: "status_changed",
        description: "Pedido marcado como entregado",
        metadata: {
          old_status: "shipped",
          new_status: "delivered",
          automated: false
        },
        created_at: new Date().toISOString()
      }

      const { error: eventError } = await supabase
        .from('order_events')
        .insert(deliveryEvent)

      if (eventError) throw eventError

      await refetchOrders()
      toast.success("Entrega confirmada correctamente")
    } catch (error) {
      console.error('Error al confirmar entrega:', error)
      toast.error("Error al confirmar la entrega")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {physicalOrders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Pedido #{order.id}</h3>
                <p className="text-sm text-gray-500">
                  {order.customer?.name || "Cliente no registrado"}
                </p>
              </div>
              <div className="space-x-2">
                {order.status === "processing" && (
                  <button
                    onClick={() => {
                      setSelectedOrder(order)
                      setShowConfirmDialog(true)
                    }}
                    disabled={isUpdating}
                    className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    Confirmar Envío
                  </button>
                )}
                {order.status === "shipped" && (
                  <button
                    onClick={() => handleConfirmDelivery(order.id)}
                    disabled={isUpdating}
                    className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-green-600 transition-colors"
                  >
                    Marcar como Entregado
                  </button>
                )}
              </div>
            </div>
            
            {order.tracking_number && (
              <div className="text-sm text-gray-600">
                <p>Tracking: {order.tracking_number}</p>
                <p>Carrier: {order.carrier}</p>
              </div>
            )}
          </div>
        ))}

        {physicalOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay pedidos físicos pendientes de envío o entrega
          </div>
        )}
      </div>

      {selectedOrder && (
        <ShippingConfirmDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          onConfirm={handleConfirmShipment}
          orderId={selectedOrder.id}
          isUpdating={isUpdating}
        />
      )}
    </div>
  )
}