import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useOrders } from "@/contexts/OrdersContext"
import { OrderStatusBadge, statusConfig } from "@/components/admin/orders/OrderStatusBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ChevronLeft, Package2, User2, MapPin, FileText } from "lucide-react"
import { OrderStatus } from "@/components/admin/orders/types"
import { toast } from "sonner"
import { OrderStatusConfirmDialog } from "@/components/admin/orders/OrderStatusConfirmDialog"
import { OrderBasicInfo } from "@/components/admin/orders/OrderBasicInfo"
import { OrderDocumentation } from "@/components/admin/orders/OrderDocumentation"
import { OrderShippingInfo } from "@/components/admin/orders/OrderShippingInfo"
import { OrderStatusControl } from "@/components/admin/orders/OrderStatusControl"

export default function OrderDetails() {
  const { orderId } = useParams()
  const { orders, updateOrder } = useOrders()
  const order = orders.find(o => o.id === orderId)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null)

  if (!order) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <Link to="/admin/orders">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Volver a pedidos
            </Button>
          </Link>
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold">Pedido no encontrado</h2>
          </div>
        </div>
      </AdminLayout>
    )
  }

  const handleStatusChange = (newStatus: OrderStatus) => {
    setPendingStatus(newStatus)
    setShowConfirmDialog(true)
  }

  const confirmStatusChange = () => {
    if (pendingStatus) {
      updateOrder(order.id, { status: pendingStatus })
      toast.success("Estado actualizado correctamente")
      setShowConfirmDialog(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/admin/orders">
            <Button variant="ghost" className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Volver a pedidos
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pedido {order.id}</h1>
          <OrderStatusBadge status={order.status} />
        </div>

        <OrderBasicInfo order={order} />
        <OrderStatusControl 
          currentStatus={order.status} 
          orderType={order.type}
          onStatusChange={handleStatusChange}
        />
        <OrderDocumentation order={order} />
        {order.type === "physical" && <OrderShippingInfo order={order} />}

        <OrderStatusConfirmDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          pendingStatus={pendingStatus}
          onConfirm={confirmStatusChange}
          orderType={order.type}
        />
      </div>
    </AdminLayout>
  )
}