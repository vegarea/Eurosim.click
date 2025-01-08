import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Order } from "@/types/database/orders"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "activation_date",
    header: "Fecha de Activación",
    cell: ({ row }) => {
      const date = row.getValue("activation_date") as string
      return date ? format(new Date(date), "PPP", { locale: es }) : "No especificada"
    },
  },
  {
    accessorKey: "customer.name",
    header: "Cliente",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant="outline">
          {type === 'physical' ? 'SIM Física' : 'eSIM'}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === 'delivered' ? 'success' : 'default'}>
          {status === 'delivered' ? 'Entregado' : 'En Proceso'}
        </Badge>
      )
    },
  },
]