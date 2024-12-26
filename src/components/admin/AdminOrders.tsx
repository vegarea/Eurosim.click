import { useState } from "react"
import { OrdersFilter } from "./orders/OrdersFilter"
import { OrdersTable } from "./orders/OrdersTable"
import { mockOrders } from "./orders/mockData"
import { Order, OrderStatus } from "./orders/types"
import { useToast } from "@/components/ui/use-toast"

export function AdminOrders() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const { toast } = useToast()

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOrderClick = (order: Order) => {
    toast({
      title: `Pedido ${order.id}`,
      description: "Vista detallada en desarrollo",
    })
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

      <div className="border rounded-lg">
        <OrdersTable 
          orders={filteredOrders}
          onOrderClick={handleOrderClick}
        />
      </div>
    </div>
  )
}