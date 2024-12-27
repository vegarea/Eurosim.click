import { useState } from "react"
import { useOrders } from "@/contexts/OrdersContext"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, ExternalLink, Search, MapPin, FileText, CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function AdminCustomers() {
  const { orders } = useOrders()
  const [search, setSearch] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Crear un mapa de clientes únicos basado en los pedidos
  const customers = orders.reduce((acc, order) => {
    if (!acc[order.customer]) {
      acc[order.customer] = {
        name: order.customer,
        email: order.email || "No especificado",
        phone: order.phone || "No especificado",
        orders: [],
        totalSpent: 0,
        // Obtener la información más reciente de envío y documentación
        shippingInfo: {},
        documentation: {}
      }
    }
    acc[order.customer].orders.push(order)
    acc[order.customer].totalSpent += order.total

    // Actualizar información de envío y documentación si está disponible
    if (order.shippingAddress) {
      acc[order.customer].shippingInfo = {
        address: order.shippingAddress,
        city: order.city,
        state: order.state,
        zipCode: order.zipCode
      }
    }
    if (order.passportNumber) {
      acc[order.customer].documentation = {
        passportNumber: order.passportNumber,
        birthDate: order.birthDate,
        gender: order.gender,
        activationDate: order.activationDate
      }
    }
    return acc
  }, {} as Record<string, any>)

  // Filtrar clientes basado en la búsqueda
  const filteredCustomers = Object.values(customers).filter(customer => 
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Clientes</CardTitle>
          <CardDescription>
            Administra la información de tus clientes y sus pedidos relacionados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Buscar por nombre, email o teléfono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Pedidos</TableHead>
                  <TableHead>Total Gastado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{customer.orders.length}</span> pedidos
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${customer.totalSpent.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setIsDetailsOpen(true)
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Ver detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Detalles del Cliente
            </DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
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
                        <span>{selectedCustomer.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{selectedCustomer.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Resumen de Pedidos</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">{selectedCustomer.orders.length}</div>
                          <p className="text-sm text-gray-500">Pedidos totales</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">${selectedCustomer.totalSpent.toFixed(2)}</div>
                          <p className="text-sm text-gray-500">Total gastado</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Últimos Pedidos</h3>
                    <div className="space-y-2">
                      {selectedCustomer.orders.slice(0, 3).map((order: any) => (
                        <div key={order.id} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">#{order.id}</span>
                            <Badge variant="outline">{order.status}</Badge>
                          </div>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-4">
                {selectedCustomer.shippingInfo.address ? (
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{selectedCustomer.shippingInfo.address}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Ciudad</label>
                        <p>{selectedCustomer.shippingInfo.city || "No especificada"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Estado</label>
                        <p>{selectedCustomer.shippingInfo.state || "No especificado"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Código Postal</label>
                        <p>{selectedCustomer.shippingInfo.zipCode || "No especificado"}</p>
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
                {selectedCustomer.documentation.passportNumber ? (
                  <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span>Pasaporte: {selectedCustomer.documentation.passportNumber}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Fecha de Nacimiento</label>
                        <p>{selectedCustomer.documentation.birthDate || "No especificada"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Género</label>
                        <p>{selectedCustomer.documentation.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Fecha de Activación</label>
                        <p>{selectedCustomer.documentation.activationDate || "No especificada"}</p>
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}