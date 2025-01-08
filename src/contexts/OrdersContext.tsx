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
    console.log('📥 Iniciando fetchOrders')
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

      if (error) {
        console.error('❌ Error en fetchOrders:', error)
        throw error
      }

      console.log('✅ Órdenes obtenidas:', data?.length || 0)
      setOrders(data as Order[])
    } catch (err) {
      console.error('❌ Error en fetchOrders:', err)
      setError(err as Error)
      toast.error('Error al cargar los pedidos')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('🔄 Configurando suscripción a cambios en órdenes')
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('📣 Cambio detectado en órdenes:', payload)
          fetchOrders()
        }
      )
      .subscribe()

    return () => {
      console.log('🔌 Desuscribiendo de cambios en órdenes')
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    console.log('🔄 Iniciando updateOrder:', { orderId, updates })
    try {
      setIsLoading(true)
      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId)

      if (error) {
        console.error('❌ Error en updateOrder:', error)
        throw error
      }

      console.log('✅ Orden actualizada correctamente')
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, ...updates } : order
      ))

      toast.success('Pedido actualizado correctamente')
    } catch (err) {
      console.error('❌ Error en updateOrder:', err)
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