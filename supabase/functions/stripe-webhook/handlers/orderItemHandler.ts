export async function handleOrderItemCreation(session: any, order: any, supabase: any) {
  console.log('Creating order item for order:', order.id)

  try {
    const orderItemData = {
      order_id: order.id,
      product_id: session.metadata.product_id,
      quantity: 1,
      unit_price: parseInt(session.metadata.total_amount),
      total_price: parseInt(session.metadata.total_amount),
      metadata: {
        product_type: session.metadata.order_type,
      }
    }

    const { error: orderItemError } = await supabase
      .from('order_items')
      .insert(orderItemData)

    if (orderItemError) throw orderItemError

    console.log('Order item created successfully')
  } catch (error) {
    console.error('Error in order item creation:', error)
    throw error
  }
}