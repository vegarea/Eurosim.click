import { SupabaseClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const handleCheckoutExpired = async (
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session
) => {
  console.log('Payment session expired:', session.id);

  const { error: orderError } = await supabase
    .from('orders')
    .update({
      status: 'payment_failed',
      payment_status: 'failed',
      metadata: {
        ...session.metadata,
        stripe_session_id: session.id,
        failure_reason: 'Session expired'
      }
    })
    .eq('id', session.metadata.orderId);

  if (orderError) {
    console.error('Error updating order:', orderError);
    throw orderError;
  }

  // Crear evento de orden
  const { error: eventError } = await supabase
    .from('order_events')
    .insert({
      order_id: session.metadata.orderId,
      type: 'payment_expired',
      description: 'La sesión de pago ha expirado',
      metadata: {
        stripe_session_id: session.id
      }
    });

  if (eventError) {
    console.error('Error creating order event:', eventError);
    throw eventError;
  }
};