export async function handleOrderItemCreation(session: any, order: any, supabase: any) {
  console.log('📦 Iniciando creación de item de orden para orden:', order.id)
  console.log('Datos de sesión:', JSON.stringify(session, null, 2))

  try {
    const orderItemData = {
      order_id: order.id,
      product_id: session.metadata.product_id,
      quantity: 1,
      unit_price: parseInt(session.metadata.total_amount),
      total_price: parseInt(session.metadata.total_amount),
      metadata: {
        product_type: session.metadata.order_type,
        stripe_session_id: session.id
      }
    }

    console.log('📝 Intentando crear item de orden con datos:', JSON.stringify(orderItemData, null, 2))

    const { data: orderItem, error: orderItemError } = await supabase
      .from('order_items')
      .insert(orderItemData)
      .select()
      .single()

    if (orderItemError) {
      console.error('❌ Error creando item de orden:', orderItemError)
      console.error('Detalles del error de item:', {
        code: orderItemError.code,
        message: orderItemError.message,
        details: orderItemError.details,
        hint: orderItemError.hint
      })
      throw orderItemError
    }

    console.log('✅ Item de orden creado exitosamente:', orderItem)
    return orderItem
  } catch (error) {
    console.error('❌ Error en creación de item de orden:', error)
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