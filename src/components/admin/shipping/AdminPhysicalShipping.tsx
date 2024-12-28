import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Package } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order, OrderStatus } from "@/types/supabase"
import { OrderStatusBadge } from "../orders/OrderStatusBadge"
import { useOrders } from "@/contexts/OrdersContext"

export function AdminPhysicalShipping() {
  const { toast } = useToast()
  const { orders, updateOrder } = useOrders()
  const physicalOrders = orders.filter(order => order.type === "physical")

  // Filtrar pedidos por estado
  const pendingOrders = physicalOrders.filter(order => order.status === "processing")
  const completedOrders = physicalOrders.filter(order => order.status === "shipped")

  const handleMarkShipped = (order: Order) => {
    updateOrder(order.id, { status: "shipped" })

    toast({
      title: "Pedido marcado como enviado",
      description: `El pedido ${order.id} ha sido marcado como enviado.`
    })
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID Pedido"
    },
    {
      accessorKey: "customer",
      header: "Cliente"
    },
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ row }: any) => new Date(row.getValue("date")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }: any) => {
        const status = row.getValue("status")
        return <OrderStatusBadge status={status} />
      }
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const order = row.original
        const isProcessing = order.status === "processing"
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkShipped(order)}
              disabled={!isProcessing}
            >
              <Truck className="w-4 h-4 mr-2" />
              Marcar como enviado
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestión de Envíos SIM Física</h1>
        <p className="text-muted-foreground">
          Gestiona el estado de los envíos de SIM físicas
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="relative">
            En Preparación
            {pendingOrders.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 bg-blue-100 text-blue-800"
              >
                {pendingOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Envíos Completados
            {completedOrders.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 bg-green-100 text-green-800"
              >
                {completedOrders.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-6">
          <DataTable 
            columns={columns} 
            data={pendingOrders}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <DataTable 
            columns={columns} 
            data={completedOrders}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
