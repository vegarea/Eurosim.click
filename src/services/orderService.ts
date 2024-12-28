import { Order, CreateOrderDTO, ShippingAddress } from "@/types/order/orderTypes";
import { orderQueries } from "./order/orderQueries";
import { transformShippingAddressToJson, prepareOrderForCreate } from "@/utils/order/orderTransformers";
import { validateCreateOrderData, validateOrderStatus, validateOrderNote } from "@/utils/order/orderValidators";

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

  async updateOrderStatus(orderId: string, newStatus: Order['status']): Promise<Order> {
    const order = await this.getOrder(orderId);
    
    // Validar cambio de estado
    const errors = validateOrderStatus(order, newStatus);
    if (errors.length > 0) {
      throw new Error(`Error al actualizar estado: ${errors.join(", ")}`);
    }

    return await orderQueries.updateOrderStatus(orderId, newStatus);
  },

  async addOrderNote(orderId: string, content: string, isInternal: boolean = false): Promise<void> {
    // Validar contenido de la nota
    const errors = validateOrderNote(content);
    if (errors.length > 0) {
      throw new Error(`Error al añadir nota: ${errors.join(", ")}`);
    }

    await orderQueries.addOrderNote(orderId, content, isInternal);
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