export async function handleOrderCreation(session: any, customer: any, supabase: any) {
  console.log('📦 Iniciando creación de orden para cliente:', customer.id)
  console.log('Datos de sesión:', JSON.stringify(session, null, 2))

  try {
    if (!session || !customer) {
      console.error('❌ Faltan datos requeridos:', { 
        session: !!session, 
        customer: !!customer,
        detallesSesion: session,
        detallesCliente: customer
      })
      throw new Error('Faltan datos requeridos de sesión o cliente')
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
        stripe_session_id: session.id,
        ...session.metadata
      }
    }

    console.log('📝 Intentando crear orden con datos:', JSON.stringify(orderData, null, 2))

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single()

    if (orderError) {
      console.error('❌ Error creando orden:', orderError)
      console.error('Detalles del error de orden:', {
        code: orderError.code,
        message: orderError.message,
        details: orderError.details,
        hint: orderError.hint
      })
      throw orderError
    }

    console.log('✅ Orden creada exitosamente:', order)
    return order
  } catch (error) {
    console.error('❌ Error en creación de orden:', error)
    console.error('Detalles del error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      details: error.details || 'Sin detalles adicionales',
      metadata: session?.metadata
    })
    throw error
  }
}