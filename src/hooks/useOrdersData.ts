import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderStatus } from '@/types';
import { toast } from 'sonner';

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
          order_items(
            quantity,
            unit_price,
            total_price
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }

      return data.map((order: any): Order => ({
        id: order.id,
        customer_id: order.customer_id,
        product_id: order.product_id,
        customer: order.customer?.name || 'Unknown',
        email: order.customer?.email,
        phone: order.customer?.phone,
        total: order.total_amount / 100,
        total_amount: order.total_amount,
        status: order.status,
        type: order.type,
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        title: order.product?.title,
        description: order.product?.description,
        quantity: order.quantity,
        shipping_address: order.shipping_address,
        stripe_payment_intent_id: order.stripe_payment_intent_id,
        stripe_receipt_url: order.stripe_receipt_url,
        paypal_order_id: order.paypal_order_id,
        paypal_receipt_url: order.paypal_receipt_url,
        tracking_number: order.tracking_number,
        carrier: order.carrier,
        activation_date: order.activation_date,
        metadata: order.metadata,
        created_at: order.created_at,
        updated_at: order.updated_at,
        documentation: {
          passportNumber: order.customer?.passport_number,
          birthDate: order.customer?.birth_date,
          gender: order.customer?.gender,
          activationDate: order.activation_date
        }
      }));
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

  return {
    orders,
    isLoading,
    error,
    updateOrderStatus,
  };
}