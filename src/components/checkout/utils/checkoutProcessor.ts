import { supabase } from "@/integrations/supabase/client"
import { checkoutLogger } from "./checkoutLogger"
import { Customer } from "@/types/database/customers"
import { Order } from "@/types/database/orders"
import { OrderItem } from "@/types/database/orderItems"
import { CartItem } from "@/types/ui/cart"

export class CheckoutProcessor {
  constructor(
    private formData: any,
    private cartItems: CartItem[],
    private totalAmount: number
  ) {}

  async process() {
    try {
      // 1. Iniciar pago con Stripe
      checkoutLogger.log(
        "payment_init",
        "info",
        "Iniciando proceso de pago con Stripe",
        { amount: this.totalAmount, items: this.cartItems }
      )

      // TODO: Implementar createStripePaymentIntent()
      const paymentIntent = await this.createStripePaymentIntent()

      checkoutLogger.log(
        "stripe_redirect",
        "info",
        "Redirigiendo a página de pago de Stripe",
        { paymentIntentId: paymentIntent.id }
      )

      // TODO: Implementar redirectToStripe()
      await this.redirectToStripe(paymentIntent)

      return {
        success: true,
        paymentIntentId: paymentIntent.id
      }

    } catch (error) {
      checkoutLogger.log(
        "payment_init",
        "error",
        "Error al procesar el checkout",
        null,
        error
      )
      throw error
    }
  }

  // Esta función será llamada por el webhook de Stripe
  async handlePaymentSuccess(paymentIntentId: string) {
    try {
      checkoutLogger.log(
        "payment_success",
        "success",
        "Pago confirmado por Stripe",
        { paymentIntentId }
      )

      // 1. Crear cliente
      const customer = await this.createCustomer()
      checkoutLogger.log(
        "customer_creation",
        "success",
        "Cliente creado exitosamente",
        { customerId: customer.id }
      )

      // 2. Crear orden
      const order = await this.createOrder(customer.id, paymentIntentId)
      checkoutLogger.log(
        "order_creation",
        "success",
        "Orden creada exitosamente",
        { orderId: order.id }
      )

      // 3. Crear items de la orden
      const orderItems = await this.createOrderItems(order.id)
      checkoutLogger.log(
        "order_items_creation",
        "success",
        "Items de orden creados exitosamente",
        { orderItems }
      )

      // 4. Enviar email de confirmación
      await this.sendConfirmationEmail(order.id)
      checkoutLogger.log(
        "email_sent",
        "success",
        "Email de confirmación enviado"
      )

      checkoutLogger.log(
        "checkout_completed",
        "success",
        "Proceso de checkout completado exitosamente",
        { orderId: order.id }
      )

      return {
        success: true,
        orderId: order.id
      }

    } catch (error) {
      checkoutLogger.log(
        "payment_success",
        "error",
        "Error al procesar pago exitoso",
        null,
        error
      )
      throw error
    }
  }

  private async createCustomer(): Promise<Customer> {
    const { data, error } = await supabase
      .from("customers")
      .insert({
        name: this.formData.fullName,
        email: this.formData.email,
        phone: this.formData.phone,
        passport_number: this.formData.passportNumber,
        birth_date: this.formData.birthDate,
        gender: this.formData.gender,
        default_shipping_address: this.formData.shippingAddress
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  private async createOrder(customerId: string, paymentIntentId: string): Promise<Order> {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_id: customerId,
        product_id: this.cartItems[0].product_id, // TODO: Manejar múltiples productos
        status: "processing",
        type: this.cartItems[0].type,
        total_amount: this.totalAmount,
        quantity: this.cartItems[0].quantity,
        payment_method: "stripe",
        payment_status: "completed",
        stripe_payment_intent_id: paymentIntentId,
        shipping_address: this.formData.shippingAddress
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  private async createOrderItems(orderId: string): Promise<OrderItem[]> {
    const orderItems = this.cartItems.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.total_price,
      metadata: {
        product_title: item.title,
        product_type: item.type
      }
    }))

    const { data, error } = await supabase
      .from("order_items")
      .insert(orderItems)
      .select()

    if (error) throw error
    return data
  }

  private async sendConfirmationEmail(orderId: string) {
    // TODO: Implementar envío de email
    return Promise.resolve()
  }

  private async createStripePaymentIntent() {
    // TODO: Implementar creación de PaymentIntent
    return Promise.resolve({ id: "mock_payment_intent_id" })
  }

  private async redirectToStripe(paymentIntent: any) {
    // TODO: Implementar redirección a Stripe
    return Promise.resolve()
  }
}