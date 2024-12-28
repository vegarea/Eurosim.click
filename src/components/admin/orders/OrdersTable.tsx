import { ColumnDef } from "@tanstack/react-table"
import { Order } from "@/types/order.types"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Link } from "react-router-dom"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "customer",
    header: "Cliente",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <div className="font-medium">{order.customer}</div>
          <div className="text-sm text-gray-500">{order.email}</div>
        </div>
      )
    }
  },
  {
    accessorKey: "title",
    header: "Producto",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div>
          <div className="font-medium">{order.title}</div>
          <div className="text-sm text-gray-500">Cantidad: {order.quantity}</div>
        </div>
      )
    }
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="font-medium">
          ${order.total?.toFixed(2)}
        </div>
      )
    }
  },
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="flex items-center">
          {new Date(order.created_at).toLocaleDateString()}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return <OrderStatusBadge status={row.original.status} />
    }
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {row.original.type === "physical" ? "SIM Física" : "E-SIM"}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link to={`/admin/orders/${row.original.id}`}>
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      )
    }
  }
]
