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
    console.log("[CheckoutService] Creando orden temporal:", {
      orderData,
      timestamp: new Date().toISOString()
    });
    
    const metadata = {
      customerInfo: orderData.customerInfo
    };

    console.log("[CheckoutService] Preparando datos para Supabase:", {
      product_id: orderData.productId,
      type: orderData.type,
      total_amount: orderData.totalAmount,
      quantity: orderData.quantity,
      metadata
    });

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
        metadata
      })
      .select()
      .single();

    if (error) {
      console.error("[CheckoutService] Error creando orden temporal:", error);
      throw error;
    }

    console.log("[CheckoutService] Orden temporal creada exitosamente:", order);
    return order;
  }

  async processTestPayment(orderId: string): Promise<PaymentResult> {
    console.log("[CheckoutService] Procesando pago de prueba para orden:", orderId);
    
    const paymentResult: PaymentResult = {
      success: true
    };

    console.log("[CheckoutService] Actualizando estado de pago en Supabase");
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: paymentResult.success ? 'completed' : 'failed',
        status: paymentResult.success ? 'processing' : 'payment_failed'
      })
      .eq('id', orderId);

    if (error) {
      console.error("[CheckoutService] Error actualizando estado de pago:", error);
      throw error;
    }

    console.log("[CheckoutService] Pago procesado exitosamente:", paymentResult);
    return paymentResult;
  }

  async finalizeOrder(orderId: string, paymentResult: PaymentResult): Promise<Order> {
    console.log("[CheckoutService] Finalizando orden:", {
      orderId,
      paymentResult,
      timestamp: new Date().toISOString()
    });
    
    if (!paymentResult.success) {
      console.error("[CheckoutService] No se puede finalizar orden con pago fallido");
      throw new Error("Cannot finalize order with failed payment");
    }

    console.log("[CheckoutService] Obteniendo detalles de la orden");
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select()
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error("[CheckoutService] Error obteniendo orden:", orderError);
      throw orderError;
    }

    const metadata = order.metadata as { customerInfo?: { name: string; email: string; } };
    if (!metadata?.customerInfo) {
      console.error("[CheckoutService] Error: Información de cliente no encontrada en metadata");
      throw new Error("Customer information not found in order metadata");
    }

    console.log("[CheckoutService] Creando cliente en Supabase");
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert({
        name: metadata.customerInfo.name,
        email: metadata.customerInfo.email,
      })
      .select()
      .single();

    if (customerError) {
      console.error("[CheckoutService] Error creando cliente:", customerError);
      throw customerError;
    }

    console.log("[CheckoutService] Actualizando orden con ID de cliente");
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
      console.error("[CheckoutService] Error actualizando orden con cliente:", updateError);
      throw updateError;
    }

    console.log("[CheckoutService] Orden finalizada exitosamente:", updatedOrder);
    return updatedOrder;
  }
}

export const checkoutService = new CheckoutService();