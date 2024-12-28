import { supabase } from "@/integrations/supabase/client";
import { CreateOrderDTO, Order } from "@/types/order/orderTypes";
import { transformDatabaseOrderToOrder } from "@/utils/order/orderTransformers";

export const orderQueries = {
  async createOrder(orderData: CreateOrderDTO): Promise<Order> {
    console.group('📦 Order Queries - createOrder');
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

      const transformedOrder = transformDatabaseOrderToOrder(order);
      console.log('Order created successfully:', transformedOrder);
      return transformedOrder;
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  },

  async getOrder(orderId: string): Promise<Order> {
    console.group('🔍 Order Queries - getOrder');
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

      const transformedOrder = transformDatabaseOrderToOrder(order);
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