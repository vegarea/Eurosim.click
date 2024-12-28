import { useState } from 'react';
import { checkoutService } from '@/services/checkoutService';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, clearCart } = useCart();

  const processCheckout = async (formData: any) => {
    console.log('Starting checkout process with data:', formData);
    setIsProcessing(true);
    
    try {
      // 1. Create customer
      console.log('Creating customer...');
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          passport_number: formData.passportNumber,
          birth_date: formData.birthDate,
          gender: formData.gender,
          ...(items[0].type === 'physical' && {
            default_shipping_address: {
              street: formData.address,
              city: formData.city,
              state: formData.state,
              country: 'España',
              postal_code: formData.zipCode,
              phone: formData.phone
            }
          })
        })
        .select('*')
        .single();

      if (customerError) {
        console.error('Error creating customer:', customerError);
        throw new Error('Error al crear el cliente');
      }

      if (!customer) {
        console.error('No customer data received');
        throw new Error('Error al crear el cliente: no se recibieron datos');
      }

      console.log('Customer created:', customer);

      // 2. Get product IDs from database
      console.log('Getting product IDs...');
      const orders = [];
      for (const item of items) {
        // Get real product ID from database
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('id')
          .eq('title', item.title)
          .single();

        if (productError) {
          console.error('Error getting product:', productError);
          throw new Error('Error al obtener el producto');
        }

        if (!product) {
          console.error('Product not found:', item.title);
          throw new Error(`Producto no encontrado: ${item.title}`);
        }

        console.log('Found product:', product);

        // 3. Create order with real product ID
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            customer_id: customer.id,
            product_id: product.id,
            type: item.type,
            total_amount: item.price * item.quantity,
            quantity: item.quantity,
            ...(item.type === 'physical' ? {
              shipping_address: customer.default_shipping_address
            } : {
              activation_date: formData.activationDate
            })
          })
          .select('*')
          .single();

        if (orderError) {
          console.error('Error creating order:', orderError);
          throw new Error('Error al crear la orden');
        }

        if (!order) {
          console.error('No order data received');
          throw new Error('Error al crear la orden: no se recibieron datos');
        }

        console.log('Order created:', order);
        orders.push(order);

        // 4. Create initial order event
        const { error: eventError } = await supabase
          .from('order_events')
          .insert({
            order_id: order.id,
            type: 'created',
            description: 'Orden creada exitosamente'
          });

        if (eventError) {
          console.error('Error creating order event:', eventError);
          // No lanzamos error aquí ya que no es crítico
        }

        console.log('Order event created for order:', order.id);
      }

      // 5. Create Stripe checkout session
      console.log('Creating Stripe checkout session...');
      const { data: stripeSession, error: stripeError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          products: items.map(item => ({
            ...item,
            price: item.price * 100 // Convert to cents for Stripe
          })),
          customerData: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone
          },
          metadata: {
            orderId: orders[0].id // We'll use the first order ID for tracking
          }
        }
      });

      if (stripeError) {
        console.error('Error creating Stripe session:', stripeError);
        throw stripeError;
      }

      if (!stripeSession?.url) {
        console.error('No Stripe session URL received');
        throw new Error('No se recibió la URL de pago de Stripe');
      }

      // 6. Redirect to Stripe checkout
      console.log('Redirecting to Stripe checkout:', stripeSession.url);
      window.location.href = stripeSession.url;

      return true;
    } catch (error) {
      console.error('Error in checkout process:', error);
      toast.error('Error al procesar el pedido');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processCheckout,
    isProcessing
  };
};