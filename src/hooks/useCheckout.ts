import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { customerService } from '@/services/customerService';
import { orderService } from '@/services/orderService';
import { stripeService } from '@/services/stripeService';

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, clearCart } = useCart();

  const processCheckout = async (formData: any) => {
    console.group('🚀 Starting Checkout Process');
    console.log('Initial form data:', formData);
    console.log('Cart items:', items);
    setIsProcessing(true);
    
    try {
      // Determinar si necesitamos dirección de envío
      const needsShipping = items.some(item => item.type === 'physical');
      console.log('Needs shipping address?', needsShipping);
      
      // 1. Crear o actualizar cliente
      console.group('👤 Customer Creation/Update Step');
      const customerPayload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        passport_number: formData.passportNumber,
        birth_date: formData.birthDate,
        gender: formData.gender,
        // Solo incluir shipping_address si es necesario
        shipping_address: needsShipping ? {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.zipCode,
          country: 'ES',
          phone: formData.phone
        } : null
      };
      console.log('Customer payload:', customerPayload);

      const customer = await customerService.findOrCreateCustomer(customerPayload);
      console.log('Customer response:', customer);
      console.groupEnd();

      // 2. Crear órdenes
      console.group('📦 Order Creation Step');
      const orders = [];
      for (const item of items) {
        console.log('Creating order for item:', item);
        const orderPayload = {
          customer_id: customer.id,
          product_id: item.id,
          type: item.type,
          total_amount: item.price * item.quantity * 100,
          quantity: item.quantity,
          shipping_address: item.type === 'physical' ? customerPayload.shipping_address : null,
          activation_date: item.type === 'esim' ? formData.activationDate : null
        };
        console.log('Order payload:', orderPayload);

        const order = await orderService.createOrder(orderPayload);
        console.log('Order creation response:', order);
        orders.push(order);

        console.log('Creating order event...');
        await orderService.createOrderEvent(
          order.id,
          'created',
          'Orden creada exitosamente'
        );
      }
      console.groupEnd();

      // 3. Crear sesión de Stripe
      console.group('💳 Stripe Session Creation Step');
      const stripePayload = {
        products: items.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price * 100,
          quantity: item.quantity,
          type: item.type
        })),
        customerData: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone || ''
        },
        metadata: {
          orderId: orders[0].id,
          customerId: customer.id
        }
      };
      console.log('Stripe session payload:', stripePayload);

      const session = await stripeService.createCheckoutSession(stripePayload);
      console.log('Stripe session response:', session);
      console.groupEnd();

      // 4. Redireccionar a Stripe
      console.log('🔄 Redirecting to Stripe URL:', session.url);
      window.location.href = session.url;
      return true;
    } catch (error) {
      console.group('❌ Checkout Error');
      console.error('Full error object:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      console.groupEnd();
      
      toast.error(error instanceof Error ? error.message : 'Error al procesar el pedido');
      return false;
    } finally {
      console.groupEnd();
      setIsProcessing(false);
    }
  };

  return {
    processCheckout,
    isProcessing
  };
};