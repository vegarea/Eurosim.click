import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Customer } from "@/types/database/customers"
import { Order } from "@/types/database/orders"
import { toast } from "sonner"

export function useCustomers() {
  const queryClient = useQueryClient()

  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select(`
          *,
          orders (
            id,
            status,
            type,
            total_amount,
            created_at,
            shipping_address
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching customers:', error)
        throw error
      }

      return data as (Customer & { orders: Order[] })[]
    }
  })

  const updateCustomer = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Customer> & { id: string }) => {
      const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Customer
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast.success('Cliente actualizado correctamente')
    },
    onError: (error) => {
      console.error('Error updating customer:', error)
      toast.error('Error al actualizar el cliente')
    }
  })

  return {
    customers,
    isLoading,
    error,
    updateCustomer: updateCustomer.mutate
  }
}