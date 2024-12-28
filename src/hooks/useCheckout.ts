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
      // 1. Revalidar productos y stock
      console.log('Validating products and stock...');
      for (const item of items) {
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('id, status, stock, title')
          .eq('id', item.id)
          .single();

        if (productError) {
          console.error('Error validating product:', productError);
          throw new Error('Error al validar el producto');
        }

        if (!product) {
          console.error('Product not found:', item.id);
          throw new Error(`El producto "${item.title}" no existe`);
        }

        if (product.status !== 'active') {
          console.error('Product is inactive:', item.id);
          throw new Error(`El producto "${item.title}" no está disponible actualmente`);
        }

        if (item.type === 'physical' && (product.stock || 0) < item.quantity) {
          console.error('Insufficient stock:', item.id);
          throw new Error(`Stock insuficiente para "${item.title}"`);
        }
      }

      // 2. Buscar o crear cliente
      console.log('Creating or updating customer...');
      let customer;
      const { data: existingCustomer, error: customerSearchError } = await supabase
        .from('customers')
        .select('*')
        .eq('email', formData.email)
        .maybeSingle();

      if (customerSearchError) {
        console.error('Error searching for customer:', customerSearchError);
        throw new Error('Error al buscar cliente');
      }

      if (existingCustomer) {
        // Actualizar cliente existente
        const { data: updatedCustomer, error: updateError } = await supabase
          .from('customers')
          .update({
            name: formData.fullName,
            phone: formData.phone,
            passport_number: formData.passportNumber,
            birth_date: formData.birthDate,
            gender: formData.gender,
            default_shipping_address: items.some(item => item.type === 'physical') ? {
              street: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
              country: 'ES',
              phone: formData.phone
            } : null
          })
          .eq('id', existingCustomer.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating customer:', updateError);
          throw new Error('Error al actualizar cliente');
        }

        customer = updatedCustomer;
      } else {
        // Crear nuevo cliente
        const { data: newCustomer, error: createError } = await supabase
          .from('customers')
          .insert({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            passport_number: formData.passportNumber,
            birth_date: formData.birthDate,
            gender: formData.gender,
            default_shipping_address: items.some(item => item.type === 'physical') ? {
              street: formData.address,
              city: formData.city,
              state: formData.state,
              postal_code: formData.zipCode,
              country: 'ES',
              phone: formData.phone
            } : null
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating customer:', createError);
          throw new Error('Error al crear cliente');
        }

        customer = newCustomer;
      }

      console.log('Customer created/updated:', customer);

      // 3. Crear órdenes
      console.log('Creating orders...');
      const orders = [];
      for (const item of items) {
        // Verificar producto una última vez
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('id, status, stock')
          .eq('id', item.id)
          .single();

        if (productError || !product) {
          console.error('Error getting product:', productError);
          throw new Error(`El producto ya no está disponible`);
        }

        if (product.status !== 'active') {
          throw new Error(`El producto ya no está activo`);
        }

        if (item.type === 'physical' && (product.stock || 0) < item.quantity) {
          throw new Error(`Stock insuficiente`);
        }

        console.log('Creating order for product:', product);

        // Crear orden
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            customer_id: customer.id,
            product_id: item.id,
            type: item.type,
            total_amount: item.price * item.quantity * 100, // Convertir a centavos
            quantity: item.quantity,
            shipping_address: item.type === 'physical' ? customer.default_shipping_address : null,
            activation_date: item.type === 'esim' ? formData.activationDate : null
          })
          .select()
          .single();

        if (orderError) {
          console.error('Error creating order:', orderError);
          throw new Error('Error al crear la orden');
        }

        console.log('Order created:', order);
        orders.push(order);

        // Crear evento de orden
        const { error: eventError } = await supabase
          .from('order_events')
          .insert({
            order_id: order.id,
            type: 'created',
            description: 'Orden creada exitosamente'
          });

        if (eventError) {
          console.error('Error creating order event:', eventError);
        }

        console.log('Order event created for order:', order.id);
      }

      // 4. Crear sesión de Stripe
      console.log('Creating Stripe checkout session...');
      const { data: stripeSession, error: stripeError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          products: items.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price * 100, // Convertir a centavos para Stripe
            quantity: item.quantity,
            type: item.type
          })),
          customerData: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone
          },
          metadata: {
            orderId: orders[0].id,
            customerId: customer.id
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

      // 5. Redireccionar a Stripe
      console.log('Redirecting to Stripe checkout:', stripeSession.url);
      window.location.href = stripeSession.url;

      return true;
    } catch (error) {
      console.error('Error in checkout process:', error);
      toast.error(error instanceof Error ? error.message : 'Error al procesar el pedido');
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