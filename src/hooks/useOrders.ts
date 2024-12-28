import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { UIOrder, SupabaseOrder, transformToUIOrder, transformToSupabaseOrder, OrderStatus } from '@/types/supabase/base'
import { toast } from 'sonner'

export function useOrders() {
  const [orders, setOrders] = useState<UIOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customers (
            name,
            email,
            phone
          ),
          products (
            title,
            description
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const uiOrders = (data as (SupabaseOrder & {
        customers?: { name: string; email: string | null; phone: string | null };
        products?: { title: string; description: string };
      })[]).map(transformToUIOrder)

      setOrders(uiOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
      setError(error as Error)
      toast.error('Error al cargar los pedidos')
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrder = async (orderId: string, updates: Partial<UIOrder>) => {
    try {
      const supabaseUpdates = transformToSupabaseOrder(updates)
      const { error } = await supabase
        .from('orders')
        .update(supabaseUpdates)
        .eq('id', orderId)

      if (error) throw error

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId
            ? { ...order, ...updates }
            : order
        )
      )

      toast.success('Pedido actualizado correctamente')
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Error al actualizar el pedido')
    }
  }

  return {
    orders,
    updateOrder,
    isLoading,
    error,
  }
}