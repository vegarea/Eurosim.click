import { supabase } from "@/integrations/supabase/client"
import { Order, ShippingAddress } from "@/types"
import { Json } from "@/integrations/supabase/types"

const transformShippingAddress = (address: Json | null): ShippingAddress | null => {
  if (!address) return null;
  
  // Asegurarnos de que el objeto tiene la estructura correcta
  const addressObj = address as Record<string, string>;
  
  if (!addressObj.street || !addressObj.city || !addressObj.state || 
      !addressObj.country || !addressObj.postal_code || !addressObj.phone) {
    console.warn('Dirección incompleta:', addressObj);
    return null;
  }

  return {
    street: addressObj.street,
    city: addressObj.city,
    state: addressObj.state,
    country: addressObj.country,
    postal_code: addressObj.postal_code,
    phone: addressObj.phone
  };
};

export const orderService = {
  async createOrder(orderData: {
    customer_id: string;
    product_id: string;
    type: 'physical' | 'esim';
    total_amount: number;
    quantity: number;
    shipping_address?: ShippingAddress;
    activation_date?: string;
  }) {
    console.group('📦 Order Service - createOrder');
    console.log('Creating order with data:', orderData);

    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select(`
          *,
          customer:customers(
            name,
            email,
            phone
          ),
          product:products(
            title,
            description,
            price
          )
        `)
        .maybeSingle();

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }

      if (!order) {
        console.error('No order was created');
        throw new Error('Failed to create order');
      }

      // Transformar la dirección de envío antes de devolver la orden
      const transformedOrder = {
        ...order,
        shipping_address: transformShippingAddress(order.shipping_address)
      } as Order;

      console.log('Order created successfully:', transformedOrder);
      return transformedOrder;
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  },

  async createOrderEvent(orderId: string, type: string, description: string) {
    console.group('📝 Order Service - createOrderEvent');
    console.log('Creating order event:', { orderId, type, description });

    try {
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

      console.log('Order event created successfully');
    } catch (error) {
      console.error('Error in createOrderEvent:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  },

  async getOrder(orderId: string): Promise<Order> {
    console.group('🔍 Order Service - getOrder');
    console.log('Fetching order:', orderId);

    try {
      const { data: order, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(
            name,
            email,
            phone
          ),
          product:products(
            title,
            description,
            price
          )
        `)
        .eq('id', orderId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching order:', error);
        throw error;
      }

      if (!order) {
        console.error('Order not found');
        throw new Error('Order not found');
      }

      // Transformar la dirección de envío antes de devolver la orden
      const transformedOrder = {
        ...order,
        shipping_address: transformShippingAddress(order.shipping_address)
      } as Order;

      console.log('Order fetched successfully:', transformedOrder);
      return transformedOrder;
    } catch (error) {
      console.error('Error in getOrder:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }
};