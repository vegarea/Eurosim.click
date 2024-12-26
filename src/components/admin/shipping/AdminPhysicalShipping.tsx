import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { mockOrders } from "../orders/mockData"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, PackageCheck } from "lucide-react"

export function AdminPhysicalShipping() {
  const { toast } = useToast()
  // Filtramos solo las órdenes físicas que estén en estado "processing"
  const [orders] = useState(mockOrders.filter(order => 
    order.type === "physical" && order.status === "processing"
  ))

  const handleShipOrder = (order: any) => {
    toast({
      title: "Pedido marcado como enviado",
      description: `El pedido ${order.id} ha sido marcado como enviado.`
    })
  }

  const handleDeliverOrder = (order: any) => {
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
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShipOrder(order)}
              disabled={order.status !== "processing"}
            >
              <Truck className="w-4 h-4 mr-2" />
              Marcar como enviado
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeliverOrder(order)}
              disabled={order.status !== "shipped"}
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

      <DataTable 
        columns={columns} 
        data={orders}
      />
    </div>
  )
}