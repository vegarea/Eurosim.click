import { supabase } from "@/integrations/supabase/client";
import { Order, OrderType, ShippingAddress } from "@/types/database.types";

interface CreateOrderData {
  customer_id: string;
  product_id: string;
  type: OrderType;
  total_amount: number;
  quantity: number;
  shipping_address?: ShippingAddress;
  activation_date?: string;
}

export const orderService = {
  async createOrder(data: CreateOrderData): Promise<Order> {
    console.log('Creating order:', data);

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_id: data.customer_id,
        product_id: data.product_id,
        type: data.type,
        total_amount: data.total_amount,
        quantity: data.quantity,
        shipping_address: data.shipping_address || null,
        activation_date: data.activation_date,
        status: 'payment_pending',
        payment_status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    return order as Order;
  },

  async createOrderEvent(orderId: string, type: string, description: string) {
    const { error } = await supabase
      .from('order_events')
      .insert({
        order_id: orderId,
        type,
        description
      });

    if (error) throw error;
  }
};