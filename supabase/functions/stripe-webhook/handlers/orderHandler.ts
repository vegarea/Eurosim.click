export async function handleOrderCreation(session: any, customer: any, supabase: any) {
  console.log('📦 Starting order creation for customer:', customer.id)
  console.log('Session data:', {
    metadata: session.metadata,
    customer_details: session.customer_details
  })

  try {
    if (!session || !customer) {
      console.error('❌ Missing required data:', { 
        session: !!session, 
        customer: !!customer 
      })
      throw new Error('Missing required session or customer data')
    }

    // Obtener el tipo de producto de los metadatos
    const productType = session.metadata.product_type || 'physical'
    console.log('📦 Product type from metadata:', productType)

    // Formatear la dirección de envío desde los metadatos de Stripe
    const shippingAddress = productType === 'physical' && session.metadata ? {
      street: session.metadata.shipping_street || '',
      city: session.metadata.shipping_city || '',
      state: session.metadata.shipping_state || '',
      country: session.metadata.shipping_country || '',
      postal_code: session.metadata.shipping_postal_code || '',
      phone: session.metadata.shipping_phone || session.customer_details?.phone || null
    } : null;

    console.log('📦 Formatted shipping address:', shippingAddress)

    // Convertir el costo de envío de string a número
    const shippingCost = session.metadata?.shipping_cost ? 
      parseInt(session.metadata.shipping_cost, 10) : 
      0;

    // Convertir el monto total de string a número
    const totalAmount = session.metadata?.total_amount ? 
      parseInt(session.metadata.total_amount, 10) + shippingCost : 
      session.amount_total;

    console.log('💰 Order amounts:', {
      shippingCost,
      totalAmount,
      originalTotal: session.amount_total
    })

    const orderData = {
      customer_id: customer.id,
      product_id: session.metadata.product_id,
      status: 'processing',
      type: productType,
      total_amount: totalAmount,
      quantity: 1,
      payment_method: 'stripe',
      payment_status: 'completed',
      stripe_payment_intent_id: session.payment_intent,
      stripe_receipt_url: null,
      shipping_address: shippingAddress,
      activation_date: session.metadata.activation_date ? 
        new Date(session.metadata.activation_date).toISOString() : null,
      metadata: {
        stripe_session_id: session.id,
        shipping_cost: shippingCost,
        original_amount: parseInt(session.metadata.total_amount, 10),
        customer_details: session.customer_details,
        payment_status: session.payment_status,
        product_title: session.metadata.product_title
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

    // Crear el evento inicial de la orden
    const eventData = {
      order_id: order.id,
      type: 'created',
      description: `Pedido creado - ${session.metadata.product_title}`,
      metadata: {
        automated: true,
        details: `Pedido creado exitosamente con ID ${order.id}`,
        payment_method: 'stripe',
        amount: totalAmount,
        product_type: productType
      }
    }

    const { error: eventError } = await supabase
      .from('order_events')
      .insert(eventData)

    if (eventError) {
      console.error('❌ Error creating order event:', eventError)
      // No lanzamos el error aquí para no afectar la creación de la orden
      // pero lo registramos para debugging
    }

    console.log('✅ Order created successfully:', order)
    return order
  } catch (error) {
    console.error('❌ Error in order creation:', error)
    throw error
  }
}