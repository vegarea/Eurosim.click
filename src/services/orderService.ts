import { supabase } from "@/integrations/supabase/client";
import { Order, PaymentStatus, OrderStatus, ShippingAddress } from "@/types";
import { transformShippingAddress, prepareShippingAddress } from "@/utils/transformations";

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
    console.group('📝 Order Service - createOrder');
    console.log('Input order data:', orderData);
    
    try {
      const orderPayload = {
        ...orderData,
        status: 'payment_pending' as OrderStatus,
        payment_status: 'pending' as PaymentStatus,
        ...(orderData.shipping_address && {
          shipping_address: prepareShippingAddress(orderData.shipping_address)
        })
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert(orderPayload)
        .select(`
          *,
          customer:customers(name),
          product:products(title, price)
        `)
        .single();

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }

      console.log('Order created successfully:', order);

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
        shipping_address: order.shipping_address ? transformShippingAddress(order.shipping_address) : undefined,
        stripe_payment_intent_id: order.stripe_payment_intent_id,
        stripe_receipt_url: order.stripe_receipt_url,
        paypal_order_id: order.paypal_order_id,
        paypal_receipt_url: order.paypal_receipt_url,
        tracking_number: order.tracking_number,
        carrier: order.carrier,
        activation_date: order.activation_date,
        metadata: order.metadata as Record<string, any>,
        created_at: order.created_at,
        updated_at: order.updated_at
      };

      return transformedOrder;
    } finally {
      console.groupEnd();
    }
  }
};