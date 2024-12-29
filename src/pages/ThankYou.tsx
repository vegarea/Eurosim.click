import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Order } from "@/types/database/orders"

export default function ThankYou() {
  const location = useLocation()
  const [order, setOrder] = useState<Order | null>(null)

  // Assuming the order data is passed in the location state
  const orderData = location.state?.order as Order | undefined

  if (orderData) {
    setOrder(orderData)
  }

  return (
    <div className="thank-you-page">
      <h1 className="text-2xl font-bold">¡Gracias por tu pedido!</h1>
      {order ? (
        <div>
          <p>Tu pedido ID: {order.id}</p>
          <p>Estado: {order.status}</p>
          <p>Total: ${(order.total_amount / 100).toFixed(2)}</p>
        </div>
      ) : (
        <p>No se encontró información del pedido.</p>
      )}
    </div>
  )
}
