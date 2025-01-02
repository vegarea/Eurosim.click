export async function handleOrderCreation(session: any, customer: any, supabase: any) {
  console.log('Creating order for customer:', customer.id)
  console.log('Session data:', JSON.stringify(session, null, 2))

  try {
    // Validate required data
    if (!session || !customer) {
      throw new Error('Missing required session or customer data')
    }

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
        stripe_session_id: session.id,  // Guardamos el session_id aquí
        ...session.metadata
      }
    }

    console.log('Attempting to create order with data:', JSON.stringify(orderData, null, 2))

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      throw orderError
    }

    console.log('Order created successfully:', order)
    return order
  } catch (error) {
    console.error('Error in order creation:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    })
    throw error
  }
}