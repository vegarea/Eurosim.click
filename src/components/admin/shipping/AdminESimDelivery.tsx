import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { mockOrders } from "../orders/mockData"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Mail, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order } from "../orders/types"
import { OrderStatusBadge } from "../orders/OrderStatusBadge"

export function AdminESimDelivery() {
  const { toast } = useToast()
  const [orders, setOrders] = useState(mockOrders.filter(order => order.type === "esim"))

  // Filtrar pedidos por estado
  const pendingOrders = orders.filter(order => order.status === "processing")
  const completedOrders = orders.filter(order => order.status === "delivered")

  const handleSendQR = (order: Order) => {
    setOrders(orders.map(o => 
      o.id === order.id 
        ? { ...o, status: "delivered" }
        : o
    ))

    toast({
      title: "QR enviado",
      description: `El QR del pedido ${order.id} ha sido enviado por email y marcado como entregado.`
    })
  }

  const handleMarkDelivered = (order: Order) => {
    setOrders(orders.map(o => 
      o.id === order.id 
        ? { ...o, status: "delivered" }
        : o
    ))

    toast({
      title: "Pedido entregado",
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
              onClick={() => handleSendQR(order)}
              disabled={!isProcessing}
            >
              <Mail className="w-4 h-4 mr-2" />
              Enviar QR
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkDelivered(order)}
              disabled={!isProcessing}
            >
              <Check className="w-4 h-4 mr-2" />
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
        <h1 className="text-2xl font-bold">Gestión de Envíos E-SIM</h1>
        <p className="text-muted-foreground">
          Gestiona el envío de QR por email para E-SIMs y actualiza su estado
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