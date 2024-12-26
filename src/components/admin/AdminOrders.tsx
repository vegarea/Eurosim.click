import { useState } from "react"
import { OrdersFilter } from "./orders/OrdersFilter"
import { OrdersTable } from "./orders/OrdersTable"
import { OrderDetails } from "./orders/OrderDetails"
import { mockOrders } from "./orders/mockData"
import { Order, OrderStatus } from "./orders/types"

export function AdminOrders() {
  const [orders, setOrders] = useState(mockOrders)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
  }

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ))
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

      <OrderDetails
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}