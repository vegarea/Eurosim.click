import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';
import Stripe from 'https://esm.sh/stripe@14.21.0';

export const handleCheckoutCompleted = async (
  supabase: SupabaseClient,
  session: Stripe.Checkout.Session
) => {
  console.log('Payment successful for session:', session.id);

  // Actualizar el estado de la orden
  const { error: orderError } = await supabase
    .from('orders')
    .update({
      status: 'processing',
      payment_status: 'completed',
      payment_method: 'stripe',
      stripe_payment_intent_id: session.payment_intent,
      stripe_receipt_url: session.receipt_url,
      metadata: {
        ...session.metadata,
        stripe_session_id: session.id
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
      type: 'payment_completed',
      description: 'Pago completado exitosamente',
      metadata: {
        stripe_session_id: session.id,
        payment_intent: session.payment_intent
      }
    });

  if (eventError) {
    console.error('Error creating order event:', eventError);
    throw eventError;
  }

  // Registrar el pago
  const { error: paymentError } = await supabase
    .from('payments')
    .insert({
      order_id: session.metadata.orderId,
      amount: session.amount_total,
      currency: session.currency,
      status: 'completed',
      payment_method_id: session.payment_method_types[0],
      provider_payment_id: session.payment_intent,
      provider_receipt_url: session.receipt_url,
      metadata: {
        stripe_session_id: session.id
      }
    });

  if (paymentError) {
    console.error('Error creating payment record:', paymentError);
    throw paymentError;
  }
};