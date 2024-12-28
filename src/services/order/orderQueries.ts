import { supabase } from "@/integrations/supabase/client";
import { CreateOrderDTO, Order } from "@/types";
import { transformDatabaseOrderToOrder } from "@/utils/order/orderTransformers";

export const orderQueries = {
  async createOrder(orderData: CreateOrderDTO): Promise<Order> {
    console.group('📦 Order Queries - createOrder');
    console.log('Creating order with data:', orderData);

    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          customer_id: orderData.customer_id,
          product_id: orderData.product_id,
          type: orderData.type,
          total_amount: orderData.total_amount,
          quantity: orderData.quantity,
          shipping_address: orderData.shipping_address,
          activation_date: orderData.activation_date,
          notes: orderData.notes,
          metadata: orderData.metadata
        })
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
  },

  async createOrderEvent(orderId: string, type: string, description: string) {
    console.group('📝 Order Queries - createOrderEvent');
    console.log('Creating event:', { orderId, type, description });

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
  }
};