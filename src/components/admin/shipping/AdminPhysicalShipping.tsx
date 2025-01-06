import { useEffect, useState } from "react"
import { ShippingTabs } from "./components/ShippingTabs"
import { ShippingSettings } from "./components/ShippingSettings"
import { useOrders } from "@/contexts/OrdersContext"
import { ColumnDef } from "@tanstack/react-table"
import { Order } from "../orders/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Package, CheckCircle } from "lucide-react"

export function AdminPhysicalShipping() {
  const { orders } = useOrders()

  // Filter orders by status
  const pendingOrders = orders.filter(order => 
    order.type === 'physical' && order.status === 'processing'
  )
  const shippedOrders = orders.filter(order => 
    order.type === 'physical' && order.status === 'shipped'
  )
  const deliveredOrders = orders.filter(order => 
    order.type === 'physical' && order.status === 'delivered'
  )

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "ID Pedido",
      cell: ({ row }) => {
        const id = row.getValue("id") as string
        return <span className="font-medium">#{id.substring(0,8)}</span>
      }
    },
    {
      accessorKey: "created_at",
      header: "Fecha",
      cell: ({ row }) => {
        const date = row.getValue("created_at") as string
        return new Date(date).toLocaleDateString()
      }
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge 
            variant="secondary"
            className={
              status === 'processing' ? "bg-blue-100 text-blue-800" :
              status === 'shipped' ? "bg-orange-100 text-orange-800" :
              "bg-green-100 text-green-800"
            }
          >
            {status === 'processing' ? <Package className="w-4 h-4 mr-1" /> :
             status === 'shipped' ? <Truck className="w-4 h-4 mr-1" /> :
             <CheckCircle className="w-4 h-4 mr-1" />
            }
            {status === 'processing' ? 'En Preparación' :
             status === 'shipped' ? 'En Tránsito' :
             'Entregado'
            }
          </Badge>
        )
      }
    },
    {
      accessorKey: "tracking_number",
      header: "Tracking",
      cell: ({ row }) => row.getValue("tracking_number") || "-"
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="outline" size="sm">
            Ver Detalles
          </Button>
        )
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Envíos Físicos</h1>
        <p className="text-muted-foreground">
          Gestiona los envíos físicos y su configuración
        </p>
      </div>

      <ShippingSettings />
      
      <ShippingTabs 
        pendingOrders={pendingOrders}
        shippedOrders={shippedOrders}
        deliveredOrders={deliveredOrders}
        columns={columns}
      />
    </div>
  )
}