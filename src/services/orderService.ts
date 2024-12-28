import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/types";

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
    console.group('📝 Order Service - createOrder');
    console.log('Input order data:', orderData);
    
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          ...orderData,
          status: 'payment_pending',
          payment_status: 'pending'
        })
        .select(`
          *,
          customer:customers(name),
          product:products(title, price)
        `)
        .single();

      if (error) {
        console.error('Error creating order:', error);
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          query: error.query
        });
        throw error;
      }

      console.log('Order created successfully:', order);

      // Transformar la respuesta al tipo Order
      const transformedOrder: Order = {
        id: order.id,
        customer: order.customer?.name || 'Unknown',
        customer_id: order.customer_id,
        product_id: order.product_id,
        total: order.total_amount / 100,
        total_amount: order.total_amount,
        status: order.status,
        type: order.type,
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        title: order.product?.title,
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
        updated_at: order.updated_at
      };

      console.log('Transformed order:', transformedOrder);
      return transformedOrder;
    } finally {
      console.groupEnd();
    }
  },

  async createOrderEvent(orderId: string, type: string, description: string) {
    console.group('📋 Order Service - createOrderEvent');
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
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      console.log('Order event created successfully');
    } finally {
      console.groupEnd();
    }
  }
};