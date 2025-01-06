import { useState } from "react"
import { ShippingTabs } from "./components/ShippingTabs"
import { ShippingSettings } from "./components/ShippingSettings"
import { useOrders } from "@/contexts/OrdersContext"
import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@/types/database/orders"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Package, CheckCircle } from "lucide-react"
import { ShippingConfirmDialog } from "./ShippingConfirmDialog"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { createShippingConfirmationEvent } from "./utils/shippingEvents"
import { useShippingNotifications } from "@/hooks/useShippingNotifications"

export function AdminPhysicalShipping() {
  const { orders, updateOrder } = useOrders()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showShippingDialog, setShowShippingDialog] = useState(false)
  const { notifyShipment } = useShippingNotifications()

  // Filtrar pedidos por estado
  const pendingOrders = orders.filter(order => 
    order.type === 'physical' && order.status === 'processing'
  )
  const shippedOrders = orders.filter(order => 
    order.type === 'physical' && order.status === 'shipped'
  )
  const deliveredOrders = orders.filter(order => 
    order.type === 'physical' && order.status === 'delivered'
  )

  const handleShippingConfirm = async (trackingNumber: string, carrier: string) => {
    if (!selectedOrder) return

    try {
      await updateOrder(selectedOrder.id, {
        status: 'shipped',
        tracking_number: trackingNumber,
        carrier: carrier
      })

      const { error: eventError } = await supabase
        .from('order_events')
        .insert(createShippingConfirmationEvent(selectedOrder.id, trackingNumber, carrier))

      if (eventError) throw eventError

      // Enviar notificaciones
      await notifyShipment(selectedOrder, trackingNumber, carrier)

      toast.success('Envío confirmado correctamente')
      setShowShippingDialog(false)
      setSelectedOrder(null)
    } catch (error) {
      console.error('Error al confirmar envío:', error)
      toast.error('Error al confirmar el envío')
    }
  }

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ID Pedido",
      cell: ({ row }) => {
        const id = row.getValue("id") as string
        return <span className="font-medium">#{id.substring(0,8)}</span>
      }
    },
    {
      accessorKey: "customer",
      header: "Cliente",
      cell: ({ row }) => {
        const order = row.original
        return <span>{order.customer?.name || 'Cliente no registrado'}</span>
      }
    },
    {
      accessorKey: "created_at",
      header: "Fecha",
      cell: ({ row }) => {
        const date = row.getValue("created_at") as string
        return new Date(date).toLocaleDateString()
      }
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge 
            variant="secondary"
            className={
              status === 'processing' ? "bg-blue-100 text-blue-800" :
              status === 'shipped' ? "bg-orange-100 text-orange-800" :
              "bg-green-100 text-green-800"
            }
          >
            {status === 'processing' ? <Package className="w-4 h-4 mr-1" /> :
             status === 'shipped' ? <Truck className="w-4 h-4 mr-1" /> :
             <CheckCircle className="w-4 h-4 mr-1" />
            }
            {status === 'processing' ? 'En Preparación' :
             status === 'shipped' ? 'En Tránsito' :
             'Entregado'
            }
          </Badge>
        )
      }
    },
    {
      accessorKey: "tracking_number",
      header: "Tracking",
      cell: ({ row }) => row.getValue("tracking_number") || "-"
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original
        return (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSelectedOrder(order)
                setShowShippingDialog(true)
              }}
              disabled={order.status !== 'processing'}
            >
              Confirmar Envío
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Envíos Físicos</h1>
        <p className="text-muted-foreground">
          Gestiona los envíos físicos y su configuración
        </p>
      </div>

      <ShippingSettings />
      
      <ShippingTabs 
        pendingOrders={pendingOrders}
        shippedOrders={shippedOrders}
        deliveredOrders={deliveredOrders}
        columns={columns}
      />

      <ShippingConfirmDialog 
        open={showShippingDialog}
        onOpenChange={setShowShippingDialog}
        orderId={selectedOrder?.id || ''}
        onConfirm={handleShippingConfirm}
      />
    </div>
  )
}