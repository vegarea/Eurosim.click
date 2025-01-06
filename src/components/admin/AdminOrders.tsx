import { useState } from "react"
import { OrdersFilter } from "./orders/OrdersFilter"
import { OrdersTable } from "./orders/OrdersTable"
import { OrderStatus } from "@/types/database/enums"
import { useOrders } from "@/contexts/OrdersContext"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export function AdminOrders() {
  const { orders, isLoading, error, updateOrder } = useOrders()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      (order.customer?.name || '').toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrder(orderId, { status: newStatus })
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Error al cargar los pedidos: {error.message}</p>
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

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <OrdersTable 
          orders={filteredOrders}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}