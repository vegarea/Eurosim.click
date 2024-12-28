import { Order, CreateOrderDTO, ShippingAddress } from "@/types/order/orderTypes";
import { orderQueries } from "./order/orderQueries";
import { transformShippingAddressToJson, prepareOrderForCreate } from "@/utils/order/orderTransformers";

export const orderService = {
  async createOrder(orderData: {
    customer_id: string;
    product_id: string;
    type: 'physical' | 'esim';
    total_amount: number;
    quantity: number;
    shipping_address?: ShippingAddress;
    activation_date?: string;
  }): Promise<Order> {
    console.group('📦 Order Service - createOrder');
    console.log('Creating order with data:', orderData);

    try {
      const createOrderDTO: CreateOrderDTO = prepareOrderForCreate({
        ...orderData,
        shipping_address: orderData.shipping_address 
          ? transformShippingAddressToJson(orderData.shipping_address)
          : undefined
      });

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
  }
};