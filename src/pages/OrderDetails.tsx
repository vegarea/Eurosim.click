import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useOrders } from "@/contexts/OrdersContext"
import { OrderStatusBadge, statusConfig } from "@/components/admin/orders/OrderStatusBadge"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ChevronLeft, Package2, Wifi, CreditCard } from "lucide-react"
import { OrderStatus } from "@/components/admin/orders/types"
import { toast } from "sonner"
import { OrderStatusConfirmDialog } from "@/components/admin/orders/OrderStatusConfirmDialog"
import { OrderBasicInfo } from "@/components/admin/orders/OrderBasicInfo"
import { OrderDocumentation } from "@/components/admin/orders/OrderDocumentation"
import { OrderShippingInfo } from "@/components/admin/orders/OrderShippingInfo"
import { OrderCustomerInfo } from "@/components/admin/orders/OrderCustomerInfo"
import { OrderNotes } from "@/components/admin/orders/OrderNotes"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

  // Mock payment data - In a real app, this would come from your payment provider's API
  const mockPaymentData = {
    paymentUrl: "https://checkout.stripe.com/c/pay/cs_test_...",
    logs: [
      { date: "2024-01-25T10:30:00Z", event: "payment.created", status: "pending" },
      { date: "2024-01-25T10:31:00Z", event: "payment.succeeded", status: "completed" }
    ]
  }

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

  const handleAddNote = (text: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      text,
      userId: "current-user-id", // En una app real, esto vendría del contexto de autenticación
      userName: "Admin", // En una app real, esto vendría del contexto de autenticación
      createdAt: new Date().toISOString()
    }

    const currentNotes = order.notes || []
    updateOrder(order.id, {
      notes: [newNote, ...currentNotes]
    })
  }

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

        <OrderCustomerInfo 
          order={order} 
          onStatusChange={handleStatusChange}
        />

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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              Información de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Método de Pago</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {order.paymentMethod || "No especificado"}
                  </Badge>
                </div>
              </div>

              {mockPaymentData.paymentUrl && (
                <div>
                  <h3 className="font-medium mb-2">URL de Pago</h3>
                  <a 
                    href={mockPaymentData.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    Ver en {order.paymentMethod} <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-2">Registro de Eventos</h3>
                <div className="space-y-2">
                  {mockPaymentData.logs.map((log, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">{log.event}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(log.date).toLocaleString()}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary"
                        className={log.status === "completed" ? "bg-green-100 text-green-800" : ""}
                      >
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <OrderNotes 
          order={order}
          onAddNote={handleAddNote}
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
