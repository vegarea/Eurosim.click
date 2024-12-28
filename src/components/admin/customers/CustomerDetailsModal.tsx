import { Link } from "react-router-dom"
import { User, Mail, Phone, MapPin, CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Json } from "@/types/database/common"

interface CustomerDetailsModalProps {
  customer: any
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CustomerDetailsModal({ customer, isOpen, onOpenChange }: CustomerDetailsModalProps) {
  if (!customer) return null

  const shippingAddress = customer.default_shipping_address as unknown as Json;

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
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{customer.phone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Resumen de Pedidos</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{customer.orders.length}</div>
                      <p className="text-sm text-gray-500">Pedidos totales</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">${customer.totalSpent.toFixed(2)}</div>
                      <p className="text-sm text-gray-500">Total gastado</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Últimos Pedidos</h3>
                <div className="space-y-2">
                  {customer.orders.slice(0, 3).map((order: any) => (
                    <Link 
                      key={order.id} 
                      to={`/admin/orders/${order.id}`}
                      className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">#{order.id}</span>
                        <Badge variant="outline">{order.status}</Badge>
                      </div>
                      <span>${order.total_amount.toFixed(2)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            {shippingAddress ? (
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{(shippingAddress as any).street}</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Ciudad</label>
                    <p>{(shippingAddress as any).city || "No especificada"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Estado</label>
                    <p>{(shippingAddress as any).state || "No especificado"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Código Postal</label>
                    <p>{(shippingAddress as any).postal_code || "No especificado"}</p>
                  </div>
                </div>
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
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Fecha de Nacimiento</label>
                    <p>{customer.birth_date || "No especificada"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Género</label>
                    <p>{customer.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Fecha de Activación</label>
                    <p>{customer.activation_date || "No especificada"}</p>
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