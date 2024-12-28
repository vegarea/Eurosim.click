import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Order, OrderStatus } from "@/types"

interface OrdersTableProps {
  orders: Order[]
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}

export function OrdersTable({ orders, onStatusChange }: OrdersTableProps) {
  return (
    <DataTable 
      columns={columns} 
      data={orders}
    />
  )
}