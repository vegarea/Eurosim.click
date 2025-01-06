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
import { formatCurrency } from "@/utils/currency"

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

  const baseColumns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ID Pedido",
      cell: ({ row }) => {
        const order = row.original
        return order?.id ? order.id.slice(0, 8) : "N/A"
      }
    },
    {
      accessorKey: "created_at",
      header: "Fecha",
      cell: ({ row }) => {
        const order = row.original
        return order?.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"
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
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => {
        const order = row.original
        return order?.total_amount ? formatCurrency(order.total_amount) : "N/A"
      }
    }
  ]

  const pendingColumns: ColumnDef<Order>[] = [
    ...baseColumns,
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const order = row.original
        if (!order) return null

        return (
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
        )
      }
    }
  ]

  const shippedColumns: ColumnDef<Order>[] = [
    ...baseColumns,
    {
      accessorKey: "tracking_number",
      header: "Tracking",
      cell: ({ row }) => {
        const order = row.original
        return order?.tracking_number || "N/A"
      }
    },
    {
      accessorKey: "carrier",
      header: "Transportista",
      cell: ({ row }) => {
        const order = row.original
        return order?.carrier || "N/A"
      }
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const order = row.original
        if (!order) return null

        return (
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
        )
      }
    }
  ]

  const deliveredColumns: ColumnDef<Order>[] = [
    ...baseColumns,
    {
      accessorKey: "tracking_number",
      header: "Tracking",
      cell: ({ row }) => {
        const order = row.original
        return order?.tracking_number || "N/A"
      }
    },
    {
      accessorKey: "carrier",
      header: "Transportista",
      cell: ({ row }) => {
        const order = row.original
        return order?.carrier || "N/A"
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
        pendingColumns={pendingColumns}
        shippedColumns={shippedColumns}
        deliveredColumns={deliveredColumns}
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