import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Truck, PackageCheck } from "lucide-react"
import { Order } from "@/types/database/orders"
import { OrderEvent } from "@/types/database/common"
import { OrderStatusBadge } from "../orders/OrderStatusBadge"
import { useOrdersData } from "@/hooks/useOrdersData"
import { useState } from "react"
import { ShippingConfirmDialog } from "./ShippingConfirmDialog"
import { ShippingTabs } from "./components/ShippingTabs"
import { 
  createShippingConfirmationEvent, 
  createDeliveryConfirmationEvent 
} from "./utils/shippingEvents"

export function AdminPhysicalShipping() {
  const { toast } = useToast()
  const { orders, updateOrder } = useOrdersData()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const physicalOrders = orders.filter(order => order.type === "physical")
  const pendingOrders = physicalOrders.filter(order => order.status === "processing")
  const shippedOrders = physicalOrders.filter(order => order.status === "shipped")
  const deliveredOrders = physicalOrders.filter(order => order.status === "delivered")

  const handleShipOrder = (order: Order) => {
    setSelectedOrderId(order.id)
    setConfirmDialogOpen(true)
  }

  const handleConfirmShipping = (trackingNumber: string, carrier: string) => {
    if (!selectedOrderId) return

    const event = createShippingConfirmationEvent(trackingNumber, carrier)
    const currentOrder = orders.find(o => o.id === selectedOrderId)
    
    updateOrder(selectedOrderId, {
      status: "shipped",
      tracking_number: trackingNumber,
      carrier: carrier,
      metadata: {
        ...currentOrder?.metadata,
        events: [...((currentOrder?.metadata?.events as OrderEvent[]) || []), event]
      }
    })

    toast({
      title: "Envío confirmado",
      description: `El pedido ${selectedOrderId} ha sido marcado como enviado.`
    })

    setConfirmDialogOpen(false)
  }

  const handleDeliverOrder = (order: Order) => {
    const event = createDeliveryConfirmationEvent()
    
    updateOrder(order.id, {
      status: "delivered",
      metadata: {
        ...order.metadata,
        events: [...((order.metadata?.events as OrderEvent[]) || []), event]
      }
    })

    toast({
      title: "Pedido entregado",
      description: `El pedido ${order.id} ha sido marcado como entregado.`
    })
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID Pedido"
    },
    {
      accessorKey: "customer",
      header: "Cliente"
    },
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ row }: any) => new Date(row.getValue("date")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }: any) => {
        const status = row.getValue("status")
        return <OrderStatusBadge status={status} />
      }
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const order = row.original
        const isProcessing = order.status === "processing"
        const isShipped = order.status === "shipped"
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShipOrder(order)}
              disabled={!isProcessing}
            >
              <Truck className="w-4 h-4 mr-2" />
              Confirmar Envío
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeliverOrder(order)}
              disabled={!isShipped}
            >
              <PackageCheck className="w-4 h-4 mr-2" />
              Marcar como entregado
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestión de Envíos Físicos</h1>
        <p className="text-muted-foreground">
          Gestiona los envíos de SIMs físicas y actualiza su estado
        </p>
      </div>

      <ShippingTabs
        pendingOrders={pendingOrders}
        shippedOrders={shippedOrders}
        deliveredOrders={deliveredOrders}
        columns={columns}
      />

      <ShippingConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        orderId={selectedOrderId || ""}
        onConfirm={handleConfirmShipping}
      />
    </div>
  )
}