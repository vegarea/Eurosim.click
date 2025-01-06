import { useState } from "react"
import { useOrders } from "@/contexts/OrdersContext"
import { Order } from "@/types/database/orders"
import { OrderStatus } from "@/types/database/enums"
import { ShippingConfirmDialog } from "./ShippingConfirmDialog"
import { ShippingSettings } from "./components/ShippingSettings"
import { ShippingTabs } from "./components/ShippingTabs"
import { usePhysicalOrders } from "./components/usePhysicalOrders"
import { useShippingActions } from "./components/useShippingActions"
import { ColumnDef } from "@tanstack/react-table"

export function AdminPhysicalShipping() {
  const { orders, refetchOrders } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showDeliveredDialog, setShowDeliveredDialog] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const { pendingOrders, shippedOrders, deliveredOrders } = usePhysicalOrders(orders)
  const { handleConfirmShipment, handleConfirmDelivery } = useShippingActions({
    setIsUpdating,
    refetchOrders,
    setShowConfirmDialog,
    setShowDeliveredDialog
  })

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ID Pedido",
      cell: ({ row }) => {
        const order = row.original
        return order?.id ? order.id.slice(0, 8) : "N/A"
      }
    },
    {
      accessorKey: "customer",
      header: "Cliente",
      cell: ({ row }) => {
        const order = row.original
        return order?.customer?.name || "Cliente no registrado"
      }
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const order = row.original
        if (!order) return null

        return (
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