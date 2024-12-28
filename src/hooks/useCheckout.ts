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
    console.log('Starting checkout with data:', formData);
    setIsProcessing(true);
    
    try {
      // 1. Crear/actualizar cliente
      const customer = await customerService.findOrCreateCustomer({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        passport_number: formData.passportNumber,
        birth_date: formData.birthDate,
        gender: formData.gender,
        shipping_address: items.some(item => item.type === 'physical') ? {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.zipCode,
          country: 'ES',
          phone: formData.phone
        } : undefined
      });

      // 2. Crear orden
      const order = await orderService.createOrder({
        customer_id: customer.id,
        product_id: items[0].id,
        type: items[0].type,
        total_amount: items[0].price * items[0].quantity * 100,
        quantity: items[0].quantity,
        shipping_address: customer.default_shipping_address,
        activation_date: items[0].type === 'esim' ? formData.activationDate : undefined
      });

      // 3. Registrar evento
      await orderService.createOrderEvent(
        order.id,
        'created',
        'Orden creada exitosamente'
      );

      // 4. Crear sesión de Stripe
      const session = await stripeService.createCheckoutSession({
        products: items,
        customerData: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone || ''
        },
        metadata: {
          orderId: order.id,
          customerId: customer.id
        }
      });

      // 5. Redireccionar a Stripe
      window.location.href = session.url;
      return true;
    } catch (error) {
      console.error('Error in checkout:', error);
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