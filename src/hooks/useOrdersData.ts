import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderStatus, OrderStatusHistoryEntry, Customer } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export function useOrdersData() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Obtener todos los pedidos con sus relaciones
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(*),
          events:order_events(*),
          notes:order_notes(*)
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Transformar los datos para mantener compatibilidad con la interfaz existente
      return ordersData.map((order: any) => ({
        ...order,
        customer: order.customer?.name || 'Unknown',
        email: order.customer?.email,
        phone: order.customer?.phone,
        date: order.created_at,
        total: order.total_amount,
        shippingAddress: order.shipping_address?.street,
        city: order.shipping_address?.city,
        state: order.shipping_address?.state,
        zipCode: order.shipping_address?.postal_code,
        passportNumber: order.customer?.passport_number,
        birthDate: order.customer?.birth_date,
        gender: order.customer?.gender,
        activationDate: order.activation_date,
        events: order.events?.map((event: any) => ({
          ...event,
          user_name: event.user_id ? 'Admin' : 'System' // Esto debería obtenerse de la tabla de usuarios
        })),
        notes: order.notes?.map((note: any) => ({
          ...note,
          user_name: note.user_id ? 'Admin' : 'System' // Esto debería obtenerse de la tabla de usuarios
        }))
      }));
    }
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ 
      orderId, 
      newStatus, 
      reason 
    }: { 
      orderId: string; 
      newStatus: OrderStatus; 
      reason?: string 
    }) => {
      // 1. Obtener el estado actual
      const { data: currentOrder } = await supabase
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .single();

      if (!currentOrder) throw new Error('Order not found');

      // 2. Actualizar el estado del pedido
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (updateError) throw updateError;

      // 3. Registrar el cambio en el historial
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          old_status: currentOrder.status,
          new_status: newStatus,
          reason,
          changed_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (historyError) throw historyError;

      // 4. Crear evento de cambio de estado
      const { error: eventError } = await supabase
        .from('order_events')
        .insert({
          order_id: orderId,
          type: 'status_change',
          description: `Estado actualizado de ${currentOrder.status} a ${newStatus}${reason ? `: ${reason}` : ''}`
        });

      if (eventError) throw eventError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: "Estado actualizado",
        description: "El estado del pedido se ha actualizado correctamente.",
      });
    },
    onError: (error) => {
      console.error('Error updating order status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el estado del pedido.",
      });
    }
  });

  // Obtener historial de estados de un pedido
  const useOrderHistory = (orderId: string) => {
    return useQuery({
      queryKey: ['orderHistory', orderId],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('order_status_history')
          .select('*')
          .eq('order_id', orderId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data as OrderStatusHistoryEntry[];
      }
    });
  };

  return {
    orders,
    isLoading,
    error,
    updateOrderStatus,
    useOrderHistory
  };
}