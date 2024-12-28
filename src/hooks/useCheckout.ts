import { useState } from 'react';
import { checkoutService } from '@/services/checkoutService';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, clearCart } = useCart();

  const processCheckout = async (formData: any) => {
    setIsProcessing(true);
    try {
      // 1. Create customer
      const customerData = {
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
      };

      const customer = await checkoutService.createCustomer(customerData);

      // 2. Create order for each item
      for (const item of items) {
        const orderData = {
          customer_id: customer.id,
          product_id: item.id,
          type: item.type,
          total_amount: item.price * item.quantity,
          quantity: item.quantity,
          ...(item.type === 'physical' ? {
            shipping_address: customerData.default_shipping_address
          } : {
            activation_date: formData.activationDate
          })
        };

        const order = await checkoutService.createOrder(orderData);

        // 3. Create initial order event
        await checkoutService.createOrderEvent(
          order.id,
          'created',
          'Orden creada exitosamente'
        );
      }

      // 4. Clear cart and show success message
      clearCart();
      toast.success('¡Pedido creado exitosamente!');
      
      // TODO: Redirect to payment page
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