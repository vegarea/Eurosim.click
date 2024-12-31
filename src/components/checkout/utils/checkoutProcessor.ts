import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/database/customers";
import { Order } from "@/types/database/orders";
import { OrderItem } from "@/types/database/orderItems";
import { Json } from "@/types/database/common";
import { checkoutLogger } from "./checkoutLogger";

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

      // Aseguramos que el email no sea undefined
      const email = this.formData.email || '';
      console.log("Buscando cliente con email:", email);

      // Primero buscamos si el cliente ya existe
      const { data: existingCustomer, error: searchError } = await supabase
        .from("customers")
        .select()
        .eq('email', email)
        .maybeSingle();

      if (searchError) {
        console.error("Error buscando cliente:", searchError);
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
      console.error("Error en proceso de checkout:", error);
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
    const customerData = {
      name: this.formData.fullName || '',
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

    console.log("Creando nuevo cliente:", customerData);

    const { data, error } = await supabase
      .from("customers")
      .insert(customerData)
      .select()
      .single();

    if (error) {
      console.error("Error creando cliente:", error);
      throw error;
    }
    return data;
  }

  private async createOrder(customerId: string): Promise<Order> {
    const firstItem = this.cartItems[0];
    const metadata = firstItem.metadata as Record<string, any>;
    
    const orderData = {
      customer_id: customerId,
      product_id: firstItem.product_id,
      status: 'payment_pending',
      type: metadata.product_type || 'esim',
      total_amount: this.totalAmount,
      quantity: firstItem.quantity,
      payment_method: 'stripe',
      payment_status: 'pending',
      shipping_address: this.formData.shippingAddress as Json,
      tracking_number: null,
      carrier: null,
      activation_date: this.formData.activationDate || null,
      notes: [],
      metadata: {
        passportNumber: this.formData.passportNumber,
        birthDate: this.formData.birthDate,
        gender: this.formData.gender
      } as Json,
      stripe_payment_intent_id: null,
      stripe_receipt_url: null,
      paypal_order_id: null,
      paypal_receipt_url: null
    };

    console.log("Creando nueva orden:", orderData);

    const { data, error } = await supabase
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (error) {
      console.error("Error creando orden:", error);
      throw error;
    }
    return data;
  }

  private async createOrderItems(orderId: string): Promise<OrderItem[]> {
    const orderItemsData = this.cartItems.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
      metadata: item.metadata
    }));

    console.log("Creando items de orden:", orderItemsData);

    const { data, error } = await supabase
      .from("order_items")
      .insert(orderItemsData)
      .select();

    if (error) {
      console.error("Error creando items de orden:", error);
      throw error;
    }
    return data;
  }
}