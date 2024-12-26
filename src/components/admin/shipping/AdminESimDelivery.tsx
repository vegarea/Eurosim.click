import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { mockOrders } from "../orders/mockData"
import { Order } from "../orders/types"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Check } from "lucide-react"

export function AdminESimDelivery() {
  const { toast } = useToast()
  const [orders] = useState(mockOrders.filter(order => order.type === "esim"))

  const handleSendQR = (order: Order) => {
    toast({
      title: "QR enviado",
      description: `El QR del pedido ${order.id} ha sido enviado por email.`
    })
  }

  const handleMarkDelivered = (order: Order) => {
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
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
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
              onClick={() => handleSendQR(order)}
              disabled={order.status !== "processing"}
            >
              <Mail className="w-4 h-4 mr-2" />
              Enviar QR
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkDelivered(order)}
              disabled={order.status !== "processing"}
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

      <DataTable 
        columns={columns} 
        data={orders}
      />
    </div>
  )
}