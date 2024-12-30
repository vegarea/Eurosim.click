import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { OrderItem } from "@/types/database/orderItems"
import { toast } from "sonner"
import { Json } from "@/types/database/common"

export function useOrderItems(orderId?: string) {
  const queryClient = useQueryClient()

  const { data: orderItems = [], isLoading, error } = useQuery({
    queryKey: ['orderItems', orderId],
    queryFn: async () => {
      let query = supabase
        .from('order_items')
        .select('*')
        .order('created_at', { ascending: false })

      if (orderId) {
        query = query.eq('order_id', orderId)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching order items:', error)
        throw error
      }

      return data as OrderItem[]
    },
    enabled: !orderId || !!orderId
  })

  const addOrderItem = useMutation({
    mutationFn: async (newItem: Omit<OrderItem, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('order_items')
        .insert(newItem)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderItems'] })
      toast.success('Item añadido correctamente')
    },
    onError: (error) => {
      console.error('Error adding order item:', error)
      toast.error('Error al añadir el item')
    }
  })

  const updateOrderItem = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<OrderItem> & { id: string }) => {
      const { data, error } = await supabase
        .from('order_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderItems'] })
      toast.success('Item actualizado correctamente')
    },
    onError: (error) => {
      console.error('Error updating order item:', error)
      toast.error('Error al actualizar el item')
    }
  })

  return {
    orderItems,
    isLoading,
    error,
    addOrderItem: addOrderItem.mutate,
    updateOrderItem: updateOrderItem.mutate
  }
}