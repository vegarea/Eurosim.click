import { createContext, useContext, useState, useEffect } from "react"
import { Order } from "@/types/database/orders"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface OrdersContextType {
  orders: Order[]
  isLoading: boolean
  error: Error | null
  updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>
  refetchOrders: () => Promise<void>
}

const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  isLoading: false,
  error: null,
  updateOrder: async () => {},
  refetchOrders: async () => {}
})

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
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
      setIsLoading(false)
    }
  }

  // Suscribirse a cambios en tiempo real
  useEffect(() => {
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          console.log('Orden actualizada, refrescando datos...')
          fetchOrders()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OrdersContext.Provider value={{ 
      orders, 
      isLoading, 
      error, 
      updateOrder,
      refetchOrders: fetchOrders 
    }}>
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