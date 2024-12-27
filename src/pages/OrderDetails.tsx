import { useParams, Link } from "react-router-dom"
import { useOrders } from "@/contexts/OrdersContext"
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ChevronLeft } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { statusConfig } from "@/components/admin/orders/OrderStatusBadge"
import { OrderStatus } from "@/components/admin/orders/types"
import { toast } from "sonner"

export default function OrderDetails() {
  const { orderId } = useParams()
  const { orders, updateOrder } = useOrders()
  const order = orders.find(o => o.id === orderId)

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
    updateOrder(order.id, { status: newStatus })
    toast.success("Estado del pedido actualizado correctamente")
  }

  const getSimTypeBadgeStyle = (type: "physical" | "esim") => {
    if (type === "physical") {
      return "bg-[#D3E4FD] text-blue-700 hover:bg-[#D3E4FD]" // Soft blue
    }
    return "bg-[#E5DEFF] text-purple-700 hover:bg-[#E5DEFF]" // Soft purple
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

        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Pedido {order.id}</h1>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="grid gap-6 p-6 border rounded-lg bg-white">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="font-medium mb-1">Cliente</h3>
                <p>{order.customer}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Fecha</h3>
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Total</h3>
                <p>${order.total.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Tipo</h3>
                <Badge 
                  variant="secondary" 
                  className={getSimTypeBadgeStyle(order.type)}
                >
                  {order.type === "physical" ? "SIM Física" : "E-SIM"}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium mb-1">Método de Pago</h3>
                <p className="capitalize">{order.paymentMethod || "No especificado"}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Actualizar Estado</h3>
                <Select
                  value={order.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}