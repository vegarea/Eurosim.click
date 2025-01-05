import { createClient } from '@supabase/supabase-js'
import { Database } from '../../../types/database'
import { OrderStatus, PaymentStatus } from '../types/enums'
import { stripe } from '../stripe'

export async function handleOrderCreation(session: any) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient<Database>(supabaseUrl, supabaseKey)

  const pendingOrderId = session.metadata.pending_order_id

  // Obtener la orden pendiente
  const { data: pendingOrder, error: pendingError } = await supabase
    .from('pending_orders')
    .select('*')
    .eq('id', pendingOrderId)
    .single()

  if (pendingError || !pendingOrder) {
    throw new Error(`No se encontró la orden pendiente: ${pendingError?.message}`)
  }

  // Crear el cliente
  const { data: customer, error: customerError } = await supabase
    .from('customers')
    .insert({
      ...pendingOrder.customer_info,
      default_shipping_address: pendingOrder.shipping_address
    })
    .select()
    .single()

  if (customerError) throw customerError

  // Crear la orden
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: customer.id,
      product_id: pendingOrder.order_info.product_id,
      status: OrderStatus.PROCESSING,
      type: pendingOrder.order_info.type,
      total_amount: parseInt(session.metadata.total_amount),
      quantity: 1,
      payment_method: 'stripe',
      payment_status: PaymentStatus.COMPLETED,
      shipping_address: pendingOrder.shipping_address,
      stripe_payment_intent_id: session.payment_intent,
      activation_date: pendingOrder.order_info.activation_date
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Eliminar la orden pendiente
  await supabase
    .from('pending_orders')
    .delete()
    .eq('id', pendingOrderId)

  return { customer, order }
}