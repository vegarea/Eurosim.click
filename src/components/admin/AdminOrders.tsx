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

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    console.log('🔄 Iniciando cambio de estado:', { orderId, newStatus })
    try {
      console.log('📦 Datos de la orden antes del cambio:', orders.find(o => o.id === orderId))
      await updateOrder(orderId, { status: newStatus })
      console.log('✅ Estado actualizado correctamente')
      toast.success('Estado actualizado correctamente')
    } catch (error) {
      console.error('❌ Error al actualizar estado:', error)
      toast.error('Error al actualizar el estado')
    }
  }

  if (error) {
    console.error('❌ Error al cargar órdenes:', error)
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