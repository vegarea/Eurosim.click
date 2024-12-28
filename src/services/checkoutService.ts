import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CustomerData {
  name: string;
  email: string;
  phone?: string;
  passport_number?: string;
  birth_date?: string;
  gender?: string;
  default_shipping_address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    phone: string;
  };
}

interface OrderData {
  customer_id: string;
  product_id: string;
  type: 'physical' | 'esim';
  total_amount: number;
  quantity: number;
  shipping_address?: any;
  activation_date?: string;
}

export const checkoutService = {
  async createCustomer(customerData: CustomerData) {
    try {
      const { data: customer, error } = await supabase
        .from('customers')
        .insert(customerData)
        .select()
        .single();

      if (error) throw error;
      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      toast.error('Error al crear el cliente');
      throw error;
    }
  },

  async createOrder(orderData: OrderData) {
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error al crear la orden');
      throw error;
    }
  },

  async createOrderEvent(orderId: string, type: string, description: string) {
    try {
      const { error } = await supabase
        .from('order_events')
        .insert({
          order_id: orderId,
          type,
          description
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error creating order event:', error);
      // No mostramos toast aquí ya que no es crítico para el usuario
    }
  }
};