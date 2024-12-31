import { supabase } from "@/integrations/supabase/client";
import { Customer, CustomerInsert } from "@/types/database/customers";
import { Order, OrderInsert } from "@/types/database/orders";
import { OrderItem, OrderItemInsert } from "@/types/database/orderItems";
import { OrderStatus, OrderType, PaymentMethod, PaymentStatus } from "@/types/database/enums";
import { checkoutLogger } from "./checkoutLogger";
import { Json } from "@/types/database/common";

export class CheckoutProcessor {
  constructor(
    private formData: Record<string, any>,
    private cartItems: OrderItem[],
    private totalAmount: number
  ) {}

  async process() {
    try {
      checkoutLogger.log(
        "init_checkout",
        "info",
        "Iniciando proceso de checkout",
        { formData: this.formData, items: this.cartItems }
      );

      if (this.cartItems.length === 0) {
        throw new Error("El carrito está vacío");
      }

      checkoutLogger.log(
        "validating_cart",
        "success",
        "Carrito validado correctamente",
        { items: this.cartItems }
      );

      // Primero buscamos si el cliente ya existe
      const { data: existingCustomer, error: searchError } = await supabase
        .from("customers")
        .select()
        .eq('email', this.formData.email || '')
        .maybeSingle();

      if (searchError) {
        throw searchError;
      }

      let customer: Customer;
      
      if (existingCustomer) {
        customer = existingCustomer;
        checkoutLogger.log(
          "creating_customer",
          "info",
          "Cliente existente encontrado",
          { customerId: customer.id }
        );
      } else {
        customer = await this.createCustomer();
        checkoutLogger.log(
          "creating_customer",
          "success",
          "Cliente creado exitosamente",
          { customerId: customer.id }
        );
      }

      const order = await this.createOrder(customer.id);
      checkoutLogger.log(
        "creating_order",
        "success",
        "Orden creada exitosamente",
        { orderId: order.id }
      );

      const orderItems = await this.createOrderItems(order.id);
      checkoutLogger.log(
        "creating_order_items",
        "success",
        "Items de orden creados exitosamente",
        { orderItems }
      );

      return {
        success: true,
        orderId: order.id
      };

    } catch (error) {
      checkoutLogger.log(
        "checkout_failed",
        "error",
        "Error en el proceso de checkout",
        null,
        error
      );
      throw error;
    }
  }

  private async createCustomer(): Promise<Customer> {
    const customerData: CustomerInsert = {
      name: this.formData.fullName,
      email: this.formData.email || '',
      phone: this.formData.phone || null,
      passport_number: this.formData.passportNumber || null,
      birth_date: this.formData.birthDate || null,
      gender: this.formData.gender || null,
      default_shipping_address: this.formData.shippingAddress as Json,
      billing_address: null,
      preferred_language: 'es',
      marketing_preferences: {
        email_marketing: false,
        sms_marketing: false,
        push_notifications: false
      } as Json,
      stripe_customer_id: null,
      paypal_customer_id: null,
      metadata: {} as Json
    };

    const { data, error } = await supabase
      .from("customers")
      .insert(customerData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private async createOrder(customerId: string): Promise<Order> {
    const firstItem = this.cartItems[0];
    const metadata = firstItem.metadata as Record<string, any>;
    
    const orderData: OrderInsert = {
      customer_id: customerId,
      product_id: firstItem.product_id,
      status: OrderStatus.PAYMENT_PENDING,
      type: metadata.product_type as OrderType,
      total_amount: this.totalAmount,
      quantity: firstItem.quantity,
      payment_method: PaymentMethod.STRIPE,
      payment_status: PaymentStatus.PENDING,
      shipping_address: this.formData.shippingAddress as Json,
      tracking_number: null,
      carrier: null,
      activation_date: null,
      notes: [],
      metadata: {} as Json,
      stripe_payment_intent_id: null,
      stripe_receipt_url: null,
      paypal_order_id: null,
      paypal_receipt_url: null
    };

    const { data, error } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private async createOrderItems(orderId: string): Promise<OrderItem[]> {
    const orderItemsData: OrderItemInsert[] = this.cartItems.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
      metadata: item.metadata
    }));

    const { data, error } = await supabase
      .from("order_items")
      .insert(orderItemsData)
      .select();

    if (error) throw error;
    return data;
  }
}