import { useState } from "react"
import { OrdersFilter } from "./orders/OrdersFilter"
import { OrdersTable } from "./orders/OrdersTable"
import { OrderDetails } from "./orders/OrderDetails"
import { Order, OrderStatus } from "./orders/types"
import { useOrders } from "@/contexts/OrdersContext"

export function AdminOrders() {
  const { orders, updateOrder } = useOrders()
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
    updateOrder(orderId, { status: newStatus })
    // Actualizar el selectedOrder con el pedido actualizado
    const updatedOrder = orders.find(order => order.id === orderId)
    if (updatedOrder) {
      setSelectedOrder(updatedOrder)
    }
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