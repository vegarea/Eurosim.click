import { Order, CreateOrderDTO } from "@/types"
import { orderQueries } from "./order/orderQueries"
import { transformShippingAddressToJson } from "@/utils/order/orderTransformers"
import { validateCreateOrderData } from "@/utils/order/orderValidators"
import { Json } from "@/integrations/supabase/types"

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
    console.group('📦 Order Service - createOrder');
    console.log('Creating order with data:', orderData);

    try {
      const createOrderDTO: CreateOrderDTO = {
        customer_id: orderData.customer_id,
        product_id: orderData.product_id,
        type: orderData.type,
        total_amount: orderData.total_amount,
        quantity: orderData.quantity,
        shipping_address: orderData.shipping_address ? 
          transformShippingAddressToJson(orderData.shipping_address) as Json :
          undefined,
        activation_date: orderData.activation_date,
        notes: [],
        metadata: {}
      };

      // Validar datos antes de crear la orden
      const errors = validateCreateOrderData(createOrderDTO);
      if (errors.length > 0) {
        throw new Error(`Error al crear orden: ${errors.join(", ")}`);
      }

      return await orderQueries.createOrder(createOrderDTO);
    } catch (error) {
      console.error('Error in createOrder:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  },

  async getOrder(orderId: string): Promise<Order> {
    return orderQueries.getOrder(orderId);
  },

  async createOrderEvent(orderId: string, type: string, description: string) {
    console.group('📝 Order Service - createOrderEvent');
    console.log('Creating order event:', { orderId, type, description });

    try {
      return await orderQueries.createOrderEvent(orderId, type, description);
    } catch (error) {
      console.error('Error creating order event:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }
};