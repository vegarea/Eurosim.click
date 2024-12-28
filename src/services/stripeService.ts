import { supabase } from "@/integrations/supabase/client";
import { CartItem } from "@/contexts/CartContext";

export const stripeService = {
  async createCheckoutSession(params: {
    products: CartItem[];
    customerData: {
      name: string;
      email: string;
      phone: string;
    };
    metadata: {
      orderId: string;
      customerId: string;
    };
  }) {
    console.log('Creating Stripe checkout session with params:', params);

    const { data: session, error } = await supabase.functions.invoke('create-checkout-session', {
      body: params
    });

    if (error) {
      console.error('Error creating Stripe session:', error);
      throw error;
    }

    if (!session?.url) {
      console.error('No Stripe session URL received');
      throw new Error('No se recibió la URL de pago de Stripe');
    }

    console.log('Stripe session created successfully:', session);
    return session;
  }
};