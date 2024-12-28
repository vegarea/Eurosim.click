import { useState } from "react"
import { OrdersFilter } from "./orders/OrdersFilter"
import { OrdersTable } from "./orders/OrdersTable"
import { OrderStatus } from "@/types"
import { useOrdersData } from "@/hooks/useOrdersData"
import { Skeleton } from "@/components/ui/skeleton"

export function AdminOrders() {
  const { orders, isLoading, updateOrderStatus } = useOrdersData()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus.mutate({ orderId, newStatus });
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
      </div>

      <OrdersFilter
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <OrdersTable 
        orders={filteredOrders}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}