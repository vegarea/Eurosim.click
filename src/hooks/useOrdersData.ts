import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderStatus } from '@/types/order/orderTypes';
import { toast } from 'sonner';
import { transformDatabaseOrderToOrder } from '@/utils/order/orderTransformers';

export function useOrdersData() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(
            name,
            email,
            phone,
            passport_number,
            birth_date,
            gender
          ),
          product:products(
            title,
            description,
            price
          ),
          order_notes(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }

      return data.map(transformDatabaseOrderToOrder);
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, newStatus }: { orderId: string; newStatus: OrderStatus }) => {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Estado del pedido actualizado correctamente');
    },
    onError: (error) => {
      console.error('Error updating order status:', error);
      toast.error('Error al actualizar el estado del pedido');
    },
  });

  const addOrderNote = useMutation({
    mutationFn: async ({ 
      orderId, 
      content, 
      isInternal = false 
    }: { 
      orderId: string; 
      content: string; 
      isInternal?: boolean;
    }) => {
      const { error } = await supabase
        .from('order_notes')
        .insert({
          order_id: orderId,
          content,
          is_internal: isInternal,
          user_id: 'current-user-id', // En una app real, esto vendría del contexto de auth
          type: 'user_note'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Nota añadida correctamente');
    },
    onError: (error) => {
      console.error('Error adding order note:', error);
      toast.error('Error al añadir la nota');
    },
  });

  return {
    orders,
    isLoading,
    error,
    updateOrderStatus,
    addOrderNote,
  };
}