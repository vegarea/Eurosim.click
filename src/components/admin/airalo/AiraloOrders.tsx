
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AiraloOrders() {
  const { toast } = useToast()
  const [isLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Datos simulados por ahora
  const orders = [
    {
      id: "ORD12345",
      customerId: "CUST001",
      customerName: "Juan Pérez",
      productName: "Europa Unlimited",
      status: "activated",
      date: "2023-06-15",
      esimId: "ESIM12345",
      price: 29.99,
      activationDate: "2023-06-16",
      expirationDate: "2023-07-16"
    },
    {
      id: "ORD12346",
      customerId: "CUST002",
      customerName: "María García",
      productName: "América del Norte",
      status: "pending",
      date: "2023-06-17",
      esimId: null,
      price: 19.99,
      activationDate: null,
      expirationDate: null
    },
    {
      id: "ORD12347",
      customerId: "CUST003",
      customerName: "Carlos Rodríguez",
      productName: "Asia Premium",
      status: "failed",
      date: "2023-06-18",
      esimId: null,
      price: 15.99,
      activationDate: null,
      expirationDate: null
    }
  ]

  // Filtrar órdenes
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Mapa de estados para mostrar badges con diferentes colores
  const statusBadgeMap: Record<string, { label: string, variant: "default" | "outline" | "secondary" | "destructive" }> = {
    pending: { label: "Pendiente", variant: "outline" },
    activated: { label: "Activado", variant: "default" },
    failed: { label: "Fallido", variant: "destructive" }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString('es-ES')
  }

  const handleProcessOrder = (orderId: string) => {
    toast({
      title: "Procesando orden",
      description: `Procesando orden ${orderId}. Esta función se implementará completamente cuando la integración con Airalo esté activada.`,
    })
  }

  const handleResendESIM = (orderId: string) => {
    toast({
      title: "Reenvío de eSIM",
      description: `Reenviando eSIM para orden ${orderId}. Esta función se implementará completamente cuando la integración con Airalo esté activada.`,
    })
  }

  const handleCancelOrder = (orderId: string) => {
    toast({
      title: "Cancelando orden",
      description: `Cancelando orden ${orderId}. Esta función se implementará completamente cuando la integración con Airalo esté activada.`,
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Pedidos de eSIM Airalo
          </CardTitle>
          <CardDescription>
            Gestiona los pedidos de eSIM realizados a través de Airalo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="activated">Activados</TabsTrigger>
              <TabsTrigger value="failed">Fallidos</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por ID, cliente o producto..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="w-48">
                <Select 
                  value={statusFilter || ""} 
                  onValueChange={(value) => setStatusFilter(value || null)}
                >
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="activated">Activados</SelectItem>
                    <SelectItem value="failed">Fallidos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-2 p-3 border-b bg-muted/50 font-medium">
                <div className="col-span-2">ID Pedido</div>
                <div className="col-span-2">Cliente</div>
                <div className="col-span-2">Producto</div>
                <div className="col-span-1">Estado</div>
                <div className="col-span-2">Fecha</div>
                <div className="col-span-3">Acciones</div>
              </div>
              
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4">
                      <Skeleton className="h-5 w-1/6" />
                      <Skeleton className="h-5 w-1/6" />
                      <Skeleton className="h-5 w-1/6" />
                      <Skeleton className="h-5 w-1/12" />
                      <Skeleton className="h-5 w-1/6" />
                      <Skeleton className="h-5 w-1/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {filteredOrders.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No se encontraron pedidos que coincidan con tu búsqueda.
                    </div>
                  ) : (
                    filteredOrders.map(order => (
                      <div 
                        key={order.id} 
                        className="grid grid-cols-12 gap-2 p-3 border-b last:border-0 hover:bg-muted/20 items-center"
                      >
                        <div className="col-span-2 font-medium">{order.id}</div>
                        <div className="col-span-2">{order.customerName}</div>
                        <div className="col-span-2">{order.productName}</div>
                        <div className="col-span-1">
                          <Badge variant={statusBadgeMap[order.status]?.variant || "outline"}>
                            {statusBadgeMap[order.status]?.label || order.status}
                          </Badge>
                        </div>
                        <div className="col-span-2">{formatDate(order.date)}</div>
                        <div className="col-span-3 flex gap-2">
                          {order.status === "pending" && (
                            <Button 
                              size="sm" 
                              onClick={() => handleProcessOrder(order.id)}
                            >
                              Procesar
                            </Button>
                          )}
                          {order.status === "activated" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleResendESIM(order.id)}
                            >
                              Reenviar eSIM
                            </Button>
                          )}
                          {order.status !== "failed" && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              Cancelar
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
