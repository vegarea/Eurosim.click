import { Order } from "@/types/database/orders"

export function usePhysicalOrders(orders: Order[]) {
  // Aseguramos que orders sea un array
  const safeOrders = Array.isArray(orders) ? orders : []
  
  // Filtramos y organizamos los pedidos físicos por estado
  const pendingOrders = safeOrders.filter(
    order => order?.type === "physical" && order?.status === "processing"
  )

  const shippedOrders = safeOrders.filter(
    order => order?.type === "physical" && order?.status === "shipped"
  )

  const deliveredOrders = safeOrders.filter(
    order => order?.type === "physical" && order?.status === "delivered"
  )

  return {
    pendingOrders,
    shippedOrders,
    deliveredOrders
  }
}