import { createContext, useContext, useState, useEffect } from "react"
import { Order } from "@/types/database/orders"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface OrdersContextType {
  orders: Order[]
  loading: boolean
  error: Error | null
  updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>
}

const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  loading: false,
  error: null,
  updateOrder: async () => {},
})

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(*),
          events:order_events(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      setOrders(data as Order[])
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError(err as Error)
      toast.error('Error al cargar los pedidos')
    } finally {
      setLoading(false)
    }
  }

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId)

      if (error) throw error

      // Actualizar el estado local
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, ...updates } : order
      ))

      toast.success('Pedido actualizado correctamente')
    } catch (err) {
      console.error('Error updating order:', err)
      toast.error('Error al actualizar el pedido')
      throw err
    }
  }

  return (
    <OrdersContext.Provider value={{ orders, loading, error, updateOrder }}>
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrdersContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}