import { Link } from "react-router-dom"
import { User, Mail, Phone, MapPin, CreditCard, Calendar, ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Customer } from "@/types/database/customers"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Order } from "@/types/database/orders"

interface CustomerDetailsModalProps {
  customer: (Customer & { orders: Order[] }) | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerDetailsModal({ customer, isOpen, onOpenChange }: CustomerDetailsModalProps) {
  if (!customer) return null

  // Obtener la última orden para mostrar la dirección de envío
  const lastOrder = customer.orders?.[0]

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Detalles del Cliente
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Información Básica</TabsTrigger>
            <TabsTrigger value="shipping">Dirección de Envío</TabsTrigger>
            <TabsTrigger value="documentation">Documentación UE</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Información de Contacto</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>{customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  {customer.created_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Registrado el {format(new Date(customer.created_at), "PPP", { locale: es })}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Últimas Órdenes</h3>
                <div className="grid gap-2">
                  {customer.orders?.length > 0 ? (
                    customer.orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                {format(new Date(order.created_at || ''), "PPP", { locale: es })}
                              </p>
                              <p className="font-medium">
                                {order.type === 'physical' ? 'SIM Física' : 'eSIM'} - 
                                {new Intl.NumberFormat('es-ES', { 
                                  style: 'currency', 
                                  currency: 'EUR' 
                                }).format(order.total_amount / 100)}
                              </p>
                              <Badge variant={
                                order.status === 'delivered' ? 'default' :
                                order.status === 'cancelled' ? 'destructive' :
                                'secondary'
                              }>
                                {order.status}
                              </Badge>
                            </div>
                            <Link 
                              to={`/admin/orders/${order.id}`}
                              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                              Ver orden
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No hay órdenes registradas</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            {lastOrder?.shipping_address ? (
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{(lastOrder.shipping_address as any).street}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Ciudad</label>
                    <p>{(lastOrder.shipping_address as any).city || "No especificada"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Estado</label>
                    <p>{(lastOrder.shipping_address as any).state || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Código Postal</label>
                    <p>{(lastOrder.shipping_address as any).postal_code || "No especificado"}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic">
                  * Dirección de la última orden
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No hay información de envío disponible
              </div>
            )}
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            {customer.passport_number ? (
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span>Pasaporte: {customer.passport_number}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Fecha de Nacimiento</label>
                    <p>{customer.birth_date ? format(new Date(customer.birth_date), "PPP", { locale: es }) : "No especificada"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Género</label>
                    <p>{customer.gender === 'M' ? 'Masculino' : customer.gender === 'F' ? 'Femenino' : 'No especificado'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No hay documentación disponible
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}