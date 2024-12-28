import { ColumnDef } from "@tanstack/react-table"
import { Order, OrderStatus } from "@/types"
import { OrderStatusBadge } from "./OrderStatusBadge"
import { Button } from "@/components/ui/button"
import { formatDateTime } from "@/utils/formatters"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customer",
    header: "Cliente",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount)
      return formatted
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return <OrderStatusBadge status={row.getValue("status")} />
    },
  },
  {
    accessorKey: "created_at",
    header: "Fecha",
    cell: ({ row }) => formatDateTime(row.getValue("created_at")),
  },
]