import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/types/database/orders";
import { Json } from "@/types/database/common";

export interface OrderData {
  productId: string;
  type: "physical" | "esim";
  totalAmount: number;
  quantity: number;
  customerInfo: {
    name: string;
    email: string;
  };
  shippingAddress?: Json;
  activationDate?: string;
}

export interface PaymentResult {
  success: boolean;
  error?: string;
}

class CheckoutService {
  async createTemporaryOrder(orderData: OrderData): Promise<Order> {
    console.log("Creating temporary order:", orderData);
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        product_id: orderData.productId,
        type: orderData.type,
        total_amount: orderData.totalAmount,
        quantity: orderData.quantity,
        payment_method: 'test',
        payment_status: 'pending',
        status: 'payment_pending',
        shipping_address: orderData.shippingAddress || null,
        activation_date: orderData.activationDate || null,
        notes: [],
        metadata: {
          customerInfo: orderData.customerInfo
        } as Json
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating temporary order:", error);
      throw error;
    }

    return order;
  }

  async processTestPayment(orderId: string): Promise<PaymentResult> {
    console.log("Processing test payment for order:", orderId);
    
    // Simular proceso de pago (siempre exitoso en modo test)
    const paymentResult: PaymentResult = {
      success: true
    };

    // Actualizar estado del pago
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: paymentResult.success ? 'completed' : 'failed',
        status: paymentResult.success ? 'processing' : 'payment_failed'
      })
      .eq('id', orderId);

    if (error) {
      console.error("Error updating order payment status:", error);
      throw error;
    }

    return paymentResult;
  }

  async finalizeOrder(orderId: string, paymentResult: PaymentResult): Promise<Order> {
    console.log("Finalizing order:", orderId);
    
    if (!paymentResult.success) {
      throw new Error("Cannot finalize order with failed payment");
    }

    // Obtener la orden actual
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select()
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error("Error fetching order:", orderError);
      throw orderError;
    }

    // Asegurarnos de que metadata es un objeto y tiene customerInfo
    const metadata = order.metadata as { customerInfo?: OrderData['customerInfo'] };
    if (!metadata || !metadata.customerInfo) {
      throw new Error("Customer information not found in order metadata");
    }

    // Crear cliente con la información guardada
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert({
        name: metadata.customerInfo.name,
        email: metadata.customerInfo.email,
      })
      .select()
      .single();

    if (customerError) {
      console.error("Error creating customer:", customerError);
      throw customerError;
    }

    // Actualizar orden con el customer_id
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        customer_id: customer.id,
        status: 'processing'
      })
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating order with customer:", updateError);
      throw updateError;
    }

    return updatedOrder;
  }
}

export const checkoutService = new CheckoutService();