export async function handleOrderItemCreation(session: any, order: any, supabase: any) {
  console.log('📦 Starting order item creation for order:', order.id)
  console.log('Session data:', JSON.stringify(session, null, 2))

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

    console.log('📝 Attempting to create order item with data:', JSON.stringify(orderItemData, null, 2))

    const { data: orderItem, error: orderItemError } = await supabase
      .from('order_items')
      .insert(orderItemData)
      .select()
      .single()

    if (orderItemError) {
      console.error('❌ Error creating order item:', orderItemError)
      console.error('Order item error details:', {
        code: orderItemError.code,
        message: orderItemError.message,
        details: orderItemError.details,
        hint: orderItemError.hint
      })
      throw orderItemError
    }

    console.log('✅ Order item created successfully:', orderItem)
    return orderItem
  } catch (error) {
    console.error('❌ Error in order item creation:', error)
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      details: error.details || 'No additional details',
      metadata: session?.metadata
    })
    throw error
  }
}