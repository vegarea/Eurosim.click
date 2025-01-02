export async function handleOrderCreation(session: any, customer: any, supabase: any) {
  console.log('📦 Starting order creation for customer:', customer.id)
  console.log('Session data:', {
    shipping: session.shipping,
    metadata: session.metadata
  })

  try {
    if (!session || !customer) {
      console.error('❌ Missing required data:', { 
        session: !!session, 
        customer: !!customer 
      })
      throw new Error('Missing required session or customer data')
    }

    // Formatear la dirección de envío desde Stripe
    const shippingAddress = session.shipping ? {
      street: session.shipping.address.line1 + 
        (session.shipping.address.line2 ? ` ${session.shipping.address.line2}` : ''),
      city: session.shipping.address.city,
      state: session.shipping.address.state,
      country: session.shipping.address.country,
      postal_code: session.shipping.address.postal_code,
      phone: session.customer_details?.phone || null
    } : null;

    console.log('📦 Formatted shipping address:', shippingAddress)

    const orderData = {
      customer_id: customer.id,
      product_id: session.metadata.product_id,
      status: 'processing',
      type: session.metadata.order_type || 'esim',
      total_amount: parseInt(session.metadata.total_amount),
      quantity: parseInt(session.metadata.quantity) || 1,
      payment_method: 'stripe',
      payment_status: 'completed',
      stripe_payment_intent_id: session.payment_intent,
      stripe_receipt_url: session.receipt_url,
      shipping_address: shippingAddress,
      activation_date: session.metadata.activation_date ? 
        new Date(session.metadata.activation_date).toISOString() : null,
      metadata: {
        stripe_session_id: session.id,
        original_metadata: session.metadata,
        shipping_details: session.shipping,
        customer_details: session.customer_details
      }
    }

    console.log('📝 Creating order with data:', orderData)

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (orderError) {
      console.error('❌ Error creating order:', orderError)
      throw orderError
    }

    console.log('✅ Order created successfully:', order)
    return order
  } catch (error) {
    console.error('❌ Error in order creation:', error)
    throw error
  }
}