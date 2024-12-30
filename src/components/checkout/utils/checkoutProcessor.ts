import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/database/customers";
import { Order } from "@/types/database/orders";
import { OrderItem, OrderItemMetadata } from "@/types/database/orderItems";
import { CustomerGender } from "@/types/database/enums";
import { checkoutLogger } from "./checkoutLogger";

interface CartItem extends OrderItem {
  title: string;
  type: "physical" | "esim";
}

export class CheckoutProcessor {
  constructor(
    private formData: Record<string, any>,
    private cartItems: CartItem[],
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

      const customer = await this.createCustomer();
      checkoutLogger.log(
        "creating_customer",
        "success",
        "Cliente creado exitosamente",
        { customerId: customer.id }
      );

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
    const customerData = {
      name: this.formData.fullName,
      email: this.formData.email,
      phone: this.formData.phone,
      passport_number: this.formData.passportNumber,
      birth_date: this.formData.birthDate,
      gender: this.formData.gender as CustomerGender | null,
      default_shipping_address: this.formData.shippingAddress || null,
      billing_address: null,
      preferred_language: 'es',
      marketing_preferences: {
        email_marketing: false,
        sms_marketing: false,
        push_notifications: false
      },
      stripe_customer_id: null,
      paypal_customer_id: null,
      metadata: {}
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
    const orderData = {
      customer_id: customerId,
      product_id: firstItem.product_id,
      status: "payment_pending",
      type: firstItem.type,
      total_amount: this.totalAmount,
      quantity: firstItem.quantity,
      payment_method: "test",
      payment_status: "pending",
      shipping_address: this.formData.shippingAddress || null,
      tracking_number: null,
      carrier: null,
      activation_date: null,
      notes: [],
      metadata: {}
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
    const orderItemsData = this.cartItems.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
      metadata: {
        product_title: item.title,
        product_type: item.type
      } as OrderItemMetadata
    }));

    const { data, error } = await supabase
      .from("order_items")
      .insert(orderItemsData)
      .select();

    if (error) throw error;
    return data;
  }
}