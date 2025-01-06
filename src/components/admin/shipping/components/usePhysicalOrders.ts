import { Order } from "@/types/database/orders"

export function usePhysicalOrders(orders: Order[]) {
  // Filtramos y organizamos los pedidos físicos por estado
  const pendingOrders = orders.filter(
    order => order.type === "physical" && order.status === "processing"
  )

  const shippedOrders = orders.filter(
    order => order.type === "physical" && order.status === "shipped"
  )

  const deliveredOrders = orders.filter(
    order => order.type === "physical" && order.status === "delivered"
  )

  console.log('Pending Orders:', pendingOrders)
  console.log('All Orders:', orders)

  return {
    pendingOrders,
    shippedOrders,
    deliveredOrders
  }
}