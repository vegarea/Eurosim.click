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
    console.log('Starting checkout process with data:', formData);
    setIsProcessing(true);
    
    try {
      // Determinar si necesitamos dirección de envío
      const needsShipping = items.some(item => item.type === 'physical');
      
      // 1. Crear o actualizar cliente
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

      const customer = await customerService.findOrCreateCustomer(customerPayload);

      // 2. Crear órdenes
      const orders = [];
      for (const item of items) {
        const order = await orderService.createOrder({
          customer_id: customer.id,
          product_id: item.id,
          type: item.type,
          total_amount: item.price * item.quantity * 100,
          quantity: item.quantity,
          shipping_address: item.type === 'physical' ? customerPayload.shipping_address : null,
          activation_date: item.type === 'esim' ? formData.activationDate : null
        });

        orders.push(order);

        await orderService.createOrderEvent(
          order.id,
          'created',
          'Orden creada exitosamente'
        );
      }

      // 3. Crear sesión de Stripe
      const session = await stripeService.createCheckoutSession({
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
      });

      // 4. Redireccionar a Stripe
      window.location.href = session.url;
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