
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Filter, Plus, RefreshCw, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrderForm } from "./CreateOrderForm"
import { OrderDetailsDialog } from "./OrderDetailsDialog"
import { useAiraloClient } from "@/hooks/useAiraloClient"
import { AiraloOrder, AiraloPackage } from "@/types/airalo/api-types"

export function AiraloOrders() {
  const { toast } = useToast()
  const { getPackages, submitOrder, getOrder } = useAiraloClient()
  
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [orders, setOrders] = useState<AiraloOrder[]>([])
  const [packages, setPackages] = useState<AiraloPackage[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(undefined)

  // Cargar paquetes disponibles
  useEffect(() => {
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const availablePackages = await getPackages()
      setPackages(availablePackages)
    } catch (error) {
      console.error('Error fetching packages:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los paquetes de eSIM",
        variant: "destructive",
      })
    }
  }

  // Filtrar órdenes
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.package?.name?.toLowerCase().includes(searchTerm.toLowerCase() || "")
    
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

  const refreshOrders = () => {
    setIsLoading(true)
    // Esta función se implementará para cargar las órdenes reales desde la API de Airalo
    // Por ahora simulamos con datos estáticos
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleOrderCreated = () => {
    setIsCreateDialogOpen(false)
    refreshOrders()
    toast({
      title: "Orden creada",
      description: "La orden de eSIM se ha creado correctamente",
    })
  }

  const handleViewOrderDetails = (orderId: string) => {
    setSelectedOrderId(orderId)
    setIsDetailsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Pedidos de eSIM Airalo
            </CardTitle>
            <CardDescription>
              Gestiona los pedidos de eSIM realizados a través de Airalo
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refreshOrders}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualizar
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Pedido
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Pedido</DialogTitle>
                  <DialogDescription>
                    Completa el formulario para crear un nuevo pedido de eSIM a través de Airalo
                  </DialogDescription>
                </DialogHeader>
                <CreateOrderForm 
                  packages={packages}
                  onOrderCreated={handleOrderCreated}
                />
              </DialogContent>
            </Dialog>
          </div>
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
                  placeholder="Buscar por ID, código o producto..."
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
                <div className="col-span-2">Código</div>
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
                      {searchTerm || statusFilter ? 
                        "No se encontraron pedidos que coincidan con tu búsqueda." : 
                        "No hay pedidos para mostrar. Crea un nuevo pedido para comenzar."}
                    </div>
                  ) : (
                    filteredOrders.map(order => (
                      <div 
                        key={order.id} 
                        className="grid grid-cols-12 gap-2 p-3 border-b last:border-0 hover:bg-muted/20 items-center"
                      >
                        <div className="col-span-2 font-medium">{order.id}</div>
                        <div className="col-span-2">{order.code}</div>
                        <div className="col-span-2">{order.package?.name || "N/A"}</div>
                        <div className="col-span-1">
                          <Badge variant={statusBadgeMap[order.status]?.variant || "outline"}>
                            {statusBadgeMap[order.status]?.label || order.status}
                          </Badge>
                        </div>
                        <div className="col-span-2">{formatDate(order.created_at)}</div>
                        <div className="col-span-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewOrderDetails(order.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
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
      
      {/* Diálogo de detalles de orden */}
      <OrderDetailsDialog
        open={isDetailsDialogOpen}
        orderId={selectedOrderId}
        onOpenChange={setIsDetailsDialogOpen}
      />
    </div>
  )
}
