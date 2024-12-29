import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Order, OrderMetadata } from "@/types/database/orders"
import { toast } from "sonner"

export function useOrdersData() {
  const queryClient = useQueryClient()

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      console.log('Fetching orders...')
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

      if (error) {
        console.error('Error fetching orders:', error)
        throw error
      }

      return data as Order[]
    }
  })

  const updateOrder = useMutation({
    mutationFn: async ({ orderId, updates }: { orderId: string, updates: Partial<Order> }) => {
      // Asegurarse de que metadata sea un objeto JSON válido
      const processedUpdates = {
        ...updates,
        metadata: updates.metadata as Json,
        notes: updates.notes?.map(note => 
          typeof note === 'string' ? note : JSON.stringify(note)
        )
      }

      const { data, error } = await supabase
        .from('orders')
        .update(processedUpdates)
        .eq('id', orderId)
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

  return {
    orders,
    isLoading,
    error,
    updateOrder: (orderId: string, updates: Partial<Order>) => 
      updateOrder.mutate({ orderId, updates })
  }
}