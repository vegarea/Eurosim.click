import { useState } from "react"
import { useOrders } from "@/contexts/OrdersContext"
import { Order } from "@/types/database/orders"
import { OrderStatus } from "@/types/database/enums"
import { ShippingConfirmDialog } from "./ShippingConfirmDialog"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { OrderEvent } from "@/types/database/common"
import { ShippingSettings } from "./components/ShippingSettings"
import { ShippingTabs } from "./components/ShippingTabs"
import { usePhysicalOrders } from "./components/usePhysicalOrders"

export function AdminPhysicalShipping() {
  const { orders, refetchOrders } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showDeliveredDialog, setShowDeliveredDialog] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const { pendingOrders, shippedOrders, deliveredOrders } = usePhysicalOrders(orders)

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
      setShowDeliveredDialog(false)
    } catch (error) {
      console.error('Error al confirmar entrega:', error)
      toast.error("Error al confirmar la entrega")
    } finally {
      setIsUpdating(false)
    }
  }

  const columns = [
    {
      header: "ID Pedido",
      cell: (order: Order) => order.id.slice(0, 8)
    },
    {
      header: "Cliente",
      cell: (order: Order) => {
        if (order.customer_id) {
          return order.customer?.name || "Cliente no registrado"
        }
        return "Cliente no registrado"
      }
    },
    {
      header: "Acciones",
      cell: (order: Order) => (
        <div className="space-x-2">
          {order.status === "processing" && (
            <button
              onClick={() => {
                setSelectedOrder(order)
                setShowConfirmDialog(true)
              }}
              disabled={isUpdating}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Confirmar Envío
            </button>
          )}
          {order.status === "shipped" && (
            <button
              onClick={() => {
                setSelectedOrder(order)
                setShowDeliveredDialog(true)
              }}
              disabled={isUpdating}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Confirmar Entrega
            </button>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <ShippingSettings />
      
      <ShippingTabs
        pendingOrders={pendingOrders}
        shippedOrders={shippedOrders}
        deliveredOrders={deliveredOrders}
        columns={columns}
      />

      {selectedOrder && (
        <>
          <ShippingConfirmDialog
            open={showConfirmDialog}
            onOpenChange={setShowConfirmDialog}
            onConfirm={(trackingNumber, carrier) => {
              if (selectedOrder && trackingNumber && carrier) {
                handleConfirmShipment(selectedOrder.id, trackingNumber, carrier)
              }
            }}
            orderId={selectedOrder.id}
            mode="ship"
          />

          <ShippingConfirmDialog
            open={showDeliveredDialog}
            onOpenChange={setShowDeliveredDialog}
            onConfirm={() => {
              if (selectedOrder) {
                handleConfirmDelivery(selectedOrder.id)
              }
            }}
            orderId={selectedOrder.id}
            mode="deliver"
          />
        </>
      )}
    </div>
  )
}