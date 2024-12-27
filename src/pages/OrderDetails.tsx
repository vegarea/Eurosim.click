import { Link, useParams } from "react-router-dom"
import { useOrders } from "@/contexts/OrdersContext"
import { OrderStatusBadge, statusConfig } from "@/components/admin/orders/OrderStatusBadge"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ChevronLeft } from "lucide-react"
import { OrderStatus } from "@/components/admin/orders/types"
import { toast } from "sonner"
import { OrderStatusConfirmDialog } from "@/components/admin/orders/OrderStatusConfirmDialog"
import { OrderBasicInfo } from "@/components/admin/orders/OrderBasicInfo"
import { OrderDocumentation } from "@/components/admin/orders/OrderDocumentation"
import { OrderShippingInfo } from "@/components/admin/orders/OrderShippingInfo"
import { OrderStatusControl } from "@/components/admin/orders/OrderStatusControl"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, Wifi, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

  const confirmStatusChange = () => {
    if (pendingStatus) {
      updateOrder(order.id, { status: pendingStatus })
      toast.success("Estado actualizado correctamente")
      setShowConfirmDialog(false)
    }
  }

  // Calculate progress percentage based on current status
  const getProgressPercentage = () => {
    const currentIndex = statusOrder.indexOf(order.status as any)
    if (currentIndex === -1) return 0
    return ((currentIndex + 1) / statusOrder.length) * 100
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

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            {statusOrder.map((status) => (
              <span key={status}>{statusConfig[status].label}</span>
            ))}
          </div>
          <Progress value={getProgressPercentage()} />
        </div>

        <OrderBasicInfo order={order} />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package2 className="h-5 w-5 text-gray-500" />
              Detalles del Producto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-1">Producto</h3>
                <div className="flex items-center gap-2">
                  {order.type === 'physical' ? (
                    <CreditCard className="h-4 w-4 text-primary" />
                  ) : (
                    <Wifi className="h-4 w-4 text-primary" />
                  )}
                  <span>{order.title || "No especificado"}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-1">Tipo de SIM</h3>
                <Badge variant="secondary" className="capitalize">
                  {order.type === 'physical' ? 'SIM Física' : 'eSIM'}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium mb-1">Datos en Europa</h3>
                <p className="font-semibold text-primary">
                  {order.description?.match(/(\d+)GB Europa/)?.[1] || "0"}GB
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Datos en España</h3>
                <p className="font-semibold text-primary">
                  {order.description?.match(/(\d+)GB España/)?.[1] || "0"}GB
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Cantidad</h3>
                <p>{order.quantity || 1}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Precio</h3>
                <p className="font-semibold">${order.total?.toFixed(2)} MXN</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
