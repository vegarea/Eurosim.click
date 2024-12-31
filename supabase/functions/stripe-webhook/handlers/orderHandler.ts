export async function handleOrderCreation(session: any, customer: any, supabase: any) {
  console.log('Creating order for customer:', customer.id)

  try {
    const orderData = {
      customer_id: customer.id,
      product_id: session.metadata.product_id,
      status: 'processing',
      type: session.metadata.order_type,
      total_amount: parseInt(session.metadata.total_amount),
      quantity: 1,
      payment_method: 'stripe',
      payment_status: 'completed',
      stripe_payment_intent_id: session.payment_intent,
      stripe_receipt_url: session.receipt_url,
      shipping_address: session.metadata.shipping_address ? JSON.parse(session.metadata.shipping_address) : null,
      metadata: {
        stripe_session_id: session.id,
        ...session.metadata
      }
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (orderError) throw orderError

    console.log('Order created successfully:', order)
    return order
  } catch (error) {
    console.error('Error in order creation:', error)
    throw error
  }
}