import { createContext, useContext, ReactNode } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Order } from "@/types/database/orders"
import { toast } from "sonner"

interface OrdersContextType {
  orders: Order[]
  isLoading: boolean
  error: Error | null
  updateOrder: (orderId: string, updates: Partial<Order>) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customers (
            name,
            email,
            phone
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Order[]
    }
  })

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Order> & { id: string }) => {
      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      toast.success('Pedido actualizado correctamente')
    },
    onError: (error) => {
      console.error('Error updating order:', error)
      toast.error('Error al actualizar el pedido')
    }
  })

  return (
    <OrdersContext.Provider value={{
      orders,
      isLoading,
      error: error as Error | null,
      updateOrder: (id, updates) => updateOrderMutation.mutate({ id, ...updates })
    }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}