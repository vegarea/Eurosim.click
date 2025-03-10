import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useOrders } from "@/contexts/OrdersContext"
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ChevronLeft } from "lucide-react"
import { OrderStatus } from "@/types/database/enums"
import { toast } from "sonner"
import { OrderStatusConfirmDialog } from "@/components/admin/orders/OrderStatusConfirmDialog"
import { OrderBasicInfo } from "@/components/admin/orders/OrderBasicInfo"
import { OrderDocumentation } from "@/components/admin/orders/OrderDocumentation"
import { OrderCustomerInfo } from "@/components/admin/orders/OrderCustomerInfo"
import { OrderNotes } from "@/components/admin/orders/OrderNotes"
import { OrderHistory } from "@/components/admin/orders/OrderHistory"
import { Progress } from "@/components/ui/progress"
import { OrderPaymentInfo } from "@/components/admin/orders/OrderPaymentInfo"
import { OrderProductInfo } from "@/components/admin/orders/OrderProductInfo"
import { OrderStatusControl } from "@/components/admin/orders/OrderStatusControl"

const statusOrder = [
  "payment_pending",
  "processing",
  "shipped",
  "delivered",
] as const

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

  const confirmStatusChange = async () => {
    if (pendingStatus) {
      try {
        await updateOrder(order.id, { status: pendingStatus })
        toast.success("Estado actualizado correctamente")
        setShowConfirmDialog(false)
      } catch (error) {
        toast.error("Error al actualizar el estado")
      }
    }
  }

  const getProgressPercentage = () => {
    const currentIndex = statusOrder.indexOf(order.status as any)
    if (currentIndex === -1) return 0
    return ((currentIndex + 1) / statusOrder.length) * 100
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

        {/* Grid de 2 columnas para información principal */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <OrderBasicInfo order={order} />
            <OrderProductInfo order={order} />
          </div>
          
          <div className="space-y-6">
            <OrderPaymentInfo order={order} />
            <OrderDocumentation order={order} />
            <OrderNotes order={order} />
          </div>
        </div>

        {/* Historial completo */}
        <OrderHistory events={order.events} />

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