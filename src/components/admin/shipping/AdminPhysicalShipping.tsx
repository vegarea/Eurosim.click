import { useState } from "react"
import { useOrders } from "@/contexts/OrdersContext"
import { Order } from "@/types/database/orders"
import { OrderStatus } from "@/types/database/enums"
import { ShippingConfirmDialog } from "./ShippingConfirmDialog"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { OrderEvent } from "@/types/database/common"
import { OrderStatusBadge } from "../orders/OrderStatusBadge"
import { Button } from "@/components/ui/button"
import { Truck, CheckCircle2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AdminPhysicalShipping() {
  const { orders, refetchOrders } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showDeliveredDialog, setShowDeliveredDialog] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Filtramos solo pedidos físicos que estén en procesamiento o enviados
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
      setShowDeliveredDialog(false)
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
              <OrderStatusBadge status={order.status} />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {order.tracking_number && (
                  <>
                    <p>Tracking: {order.tracking_number}</p>
                    <p>Carrier: {order.carrier}</p>
                  </>
                )}
              </div>
              
              <div className="space-x-2">
                {order.status === "processing" && (
                  <Button
                    onClick={() => {
                      setSelectedOrder(order)
                      setShowConfirmDialog(true)
                    }}
                    disabled={isUpdating}
                    className="gap-2"
                  >
                    <Truck className="h-4 w-4" />
                    Confirmar Envío
                  </Button>
                )}
                {order.status === "shipped" && (
                  <Button
                    onClick={() => {
                      setSelectedOrder(order)
                      setShowDeliveredDialog(true)
                    }}
                    disabled={isUpdating}
                    variant="success"
                    className="gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Marcar como Entregado
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {physicalOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay pedidos físicos pendientes de envío o entrega
          </div>
        )}
      </div>

      {/* Diálogo de confirmación de envío */}
      {selectedOrder && (
        <ShippingConfirmDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          onConfirm={(trackingNumber, carrier) => {
            if (selectedOrder && trackingNumber && carrier) {
              handleConfirmShipment(selectedOrder.id, trackingNumber, carrier)
            }
          }}
          orderId={selectedOrder.id}
          isUpdating={isUpdating}
        />
      )}

      {/* Diálogo de confirmación de entrega */}
      <AlertDialog open={showDeliveredDialog} onOpenChange={setShowDeliveredDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar entrega</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas marcar este pedido como entregado?
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={isUpdating}
              onClick={() => selectedOrder && handleConfirmDelivery(selectedOrder.id)}
            >
              Confirmar entrega
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}