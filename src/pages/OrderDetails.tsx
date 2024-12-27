import { useParams, Link } from "react-router-dom"
import { useOrders } from "@/contexts/OrdersContext"
import { OrderStatusBadge } from "@/components/admin/orders/OrderStatusBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ChevronLeft, Package2, CreditCard, User2, MapPin, Passport } from "lucide-react"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const statusSteps: OrderStatus[] = [
  "payment_pending",
  "processing",
  "shipped",
  "delivered"
]

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

  const getCurrentStep = () => {
    if (order.status === "cancelled" || order.status === "payment_failed") {
      return -1
    }
    return statusSteps.indexOf(order.status)
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

        {/* Barra de progreso */}
        <div className="w-full bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between mb-4 relative">
            {/* Línea de progreso base */}
            <div className="absolute top-4 left-0 w-full h-1 bg-gray-200" />
            
            {/* Línea de progreso activa */}
            <div 
              className="absolute top-4 left-0 h-1 bg-brand-500 transition-all duration-300" 
              style={{ 
                width: `${getCurrentStep() >= 0 ? (getCurrentStep() / (statusSteps.length - 1)) * 100 : 0}%` 
              }} 
            />

            {/* Pasos */}
            {statusSteps.map((step, index) => {
              const currentStep = getCurrentStep()
              const isActive = index <= currentStep
              const isCurrent = index === currentStep
              
              return (
                <div key={step} className="flex flex-col items-center relative z-10" style={{ flex: '1' }}>
                  <div 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center mb-2
                      transition-all duration-300
                      ${isActive 
                        ? 'bg-brand-500 text-white' 
                        : 'bg-gray-200 text-gray-500'}
                      ${isCurrent ? 'ring-4 ring-brand-100' : ''}
                    `}
                  >
                    {index + 1}
                  </div>
                  <div className="text-sm font-medium text-center">
                    {statusConfig[step].label}
                  </div>
                </div>
              )
            })}
          </div>
          {(order.status === "cancelled" || order.status === "payment_failed") && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-md text-red-700 text-sm">
              Este pedido ha sido {order.status === "cancelled" ? "cancelado" : "marcado con error de pago"}
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {/* Encabezado del pedido */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Pedido {order.id}</h1>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Detalles del producto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package2 className="h-5 w-5 text-gray-500" />
                  Detalles del Producto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Tipo de SIM</h3>
                  <Badge 
                    variant="secondary" 
                    className={getSimTypeBadgeStyle(order.type)}
                  >
                    {order.type === "physical" ? "SIM Física" : "E-SIM"}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Producto</h3>
                  <p>{order.title || "No especificado"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Descripción</h3>
                  <p className="text-gray-600">{order.description || "No especificada"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Cantidad</h3>
                  <p>{order.quantity || 1}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Total</h3>
                  <p className="text-lg font-semibold">${order.total.toFixed(2)} MXN</p>
                </div>
              </CardContent>
            </Card>

            {/* Información del cliente y documentación UE */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User2 className="h-5 w-5 text-gray-500" />
                  Información del Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Nombre completo</h3>
                  <p>{order.customer}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p>{order.email || "No especificado"}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Teléfono</h3>
                  <p>{order.phone || "No especificado"}</p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Passport className="h-4 w-4" />
                    Documentación UE
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Pasaporte</h4>
                      <p>{order.passportNumber || "No especificado"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Fecha de nacimiento</h4>
                      <p>{order.birthDate || "No especificada"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Género</h4>
                      <p>{order.gender === 'M' ? 'Masculino' : order.gender === 'F' ? 'Femenino' : 'No especificado'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Fecha de activación</h4>
                      <p>{order.activationDate || "No especificada"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información de envío (solo para SIM física) */}
            {order.type === "physical" && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    Información de Envío
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Dirección de envío</h3>
                      <p>{order.shippingAddress || "No especificada"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Ciudad</h3>
                      <p>{order.city || "No especificada"}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Estado</h3>
                      <p>{order.state || "No especificado"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Código Postal</h3>
                      <p>{order.zipCode || "No especificado"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Información de pago */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  Información de Pago
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-medium mb-1">Método de Pago</h3>
                    <p className="capitalize">{order.paymentMethod || "No especificado"}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Estado del Pago</h3>
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
                  <div>
                    <h3 className="font-medium mb-1">Fecha del Pedido</h3>
                    <p>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}