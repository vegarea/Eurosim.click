import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import Stripe from 'https://esm.sh/stripe@14.21.0';

export const handlePaymentFailed = async (
  supabase: SupabaseClient,
  paymentIntent: Stripe.PaymentIntent
) => {
  console.log('Payment failed for intent:', paymentIntent.id);

  const { error: orderError } = await supabase
    .from('orders')
    .update({
      status: 'payment_failed',
      payment_status: 'failed',
      metadata: {
        stripe_payment_intent_id: paymentIntent.id,
        failure_reason: paymentIntent.last_payment_error?.message || 'Unknown error'
      }
    })
    .eq('stripe_payment_intent_id', paymentIntent.id);

  if (orderError) {
    console.error('Error updating order:', orderError);
    throw orderError;
  }

  // Crear evento de orden
  const { error: eventError } = await supabase
    .from('order_events')
    .insert({
      order_id: paymentIntent.metadata.orderId,
      type: 'payment_failed',
      description: 'El pago ha fallado',
      metadata: {
        payment_intent_id: paymentIntent.id,
        failure_reason: paymentIntent.last_payment_error?.message || 'Unknown error'
      }
    });

  if (eventError) {
    console.error('Error creating order event:', eventError);
    throw eventError;
  }
};