import { supabase } from "@/integrations/supabase/client";
import { Customer, Order } from "@/types";

export const orderService = {
  async createOrder(orderData: {
    customer_id: string;
    product_id: string;
    type: 'physical' | 'esim';
    total_amount: number;
    quantity: number;
    shipping_address?: any;
    activation_date?: string;
  }): Promise<Order> {
    console.log('Creating order with data:', orderData);
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        ...orderData,
        status: 'payment_pending',
        payment_status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }

    console.log('Order created successfully:', order);
    return order;
  },

  async createOrderEvent(orderId: string, type: string, description: string) {
    console.log('Creating order event:', { orderId, type, description });
    
    const { error } = await supabase
      .from('order_events')
      .insert({
        order_id: orderId,
        type,
        description
      });

    if (error) {
      console.error('Error creating order event:', error);
      throw error;
    }
  }
};