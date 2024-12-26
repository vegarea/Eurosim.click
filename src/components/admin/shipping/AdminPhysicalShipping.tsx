import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { mockOrders } from "../orders/mockData"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, PackageCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order } from "../orders/types"

export function AdminPhysicalShipping() {
  const { toast } = useToast()
  const [orders, setOrders] = useState(mockOrders.filter(order => order.type === "physical"))

  // Filtrar pedidos por estado
  const pendingOrders = orders.filter(order => order.status === "processing")
  const shippedOrders = orders.filter(order => ["shipped", "delivered"].includes(order.status))

  const handleShipOrder = (order: Order) => {
    // Actualizar el estado del pedido a enviado
    setOrders(orders.map(o => 
      o.id === order.id 
        ? { ...o, status: "shipped" }
        : o
    ))

    toast({
      title: "Pedido marcado como enviado",
      description: `El pedido ${order.id} ha sido marcado como enviado.`
    })
  }

  const handleDeliverOrder = (order: Order) => {
    // Actualizar el estado del pedido a entregado
    setOrders(orders.map(o => 
      o.id === order.id 
        ? { ...o, status: "delivered" }
        : o
    ))

    toast({
      title: "Pedido marcado como entregado",
      description: `El pedido ${order.id} ha sido marcado como entregado.`
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
        return (
          <Badge 
            variant="secondary" 
            className="bg-blue-100 text-blue-800"
          >
            {status}
          </Badge>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const order = row.original
        const isProcessing = order.status === "processing"
        const isShipped = order.status === "shipped"
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShipOrder(order)}
              disabled={!isProcessing}
            >
              <Truck className="w-4 h-4 mr-2" />
              Marcar como enviado
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeliverOrder(order)}
              disabled={!isShipped}
            >
              <PackageCheck className="w-4 h-4 mr-2" />
              Marcar como entregado
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestión de Envíos Físicos</h1>
        <p className="text-muted-foreground">
          Gestiona los envíos de SIMs físicas y actualiza su estado
        </p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="relative">
            Pendientes de Envío
            {pendingOrders.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 bg-blue-100 text-blue-800"
              >
                {pendingOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="shipped">
            En Tránsito y Entregados
            {shippedOrders.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 bg-green-100 text-green-800"
              >
                {shippedOrders.length}
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
        
        <TabsContent value="shipped" className="mt-6">
          <DataTable 
            columns={columns} 
            data={shippedOrders}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}