import { supabase } from "@/integrations/supabase/client";
import { Order, Customer } from "@/types/database";

interface OrderData {
  productId: string;
  type: "physical" | "esim";
  totalAmount: number;
  quantity: number;
  metadata: {
    name: string;
    email: string;
  };
}

interface PaymentResult {
  success: boolean;
  error?: string;
}

export const checkoutService = {
  async createTemporaryOrder(orderData: OrderData) {
    console.log("[checkoutService] Creating temporary order:", orderData);
    
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        product_id: orderData.productId,
        type: orderData.type,
        total_amount: orderData.totalAmount,
        quantity: orderData.quantity,
        status: 'payment_pending',
        payment_status: 'pending',
        metadata: orderData.metadata
      })
      .select()
      .single();

    if (error) {
      console.error("[checkoutService] Error creating order:", error);
      throw error;
    }

    return order;
  },

  async processTestPayment(orderId: string): Promise<PaymentResult> {
    console.log("[checkoutService] Processing test payment for order:", orderId);
    
    // Simular proceso de pago
    const success = Math.random() > 0.1; // 90% de éxito
    
    if (success) {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: 'completed' })
        .eq('id', orderId);

      if (error) {
        console.error("[checkoutService] Error updating payment status:", error);
        throw error;
      }

      return { success: true };
    }

    return {
      success: false,
      error: "Pago de prueba fallido"
    };
  },

  async finalizeOrder(orderId: string, paymentResult: PaymentResult) {
    console.log("[checkoutService] Finalizing order:", orderId);
    
    if (!paymentResult.success) {
      throw new Error("No se puede finalizar una orden con pago fallido");
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('metadata')
      .eq('id', orderId)
      .single();

    if (orderError) {
      console.error("[checkoutService] Error getting order:", orderError);
      throw orderError;
    }

    // Crear cliente
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert({
        name: order.metadata.name,
        email: order.metadata.email
      })
      .select()
      .single();

    if (customerError) {
      console.error("[checkoutService] Error creating customer:", customerError);
      throw customerError;
    }

    // Actualizar orden con customer_id y status
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
      console.error("[checkoutService] Error updating order:", updateError);
      throw updateError;
    }

    return updatedOrder;
  }
};