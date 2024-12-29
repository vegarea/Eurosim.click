import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/currency";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface CartProps {
  showCheckoutButton?: boolean;
  isButtonEnabled?: boolean;
  onCheckout?: (values: any) => void;
}

export function Cart({ showCheckoutButton = true, isButtonEnabled = false, onCheckout }: CartProps) {
  const { toast } = useToast();
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      if (items.length === 0) {
        toast({
          title: "Carrito vacío",
          description: "Agrega productos a tu carrito para continuar",
          variant: "destructive",
        });
        return;
      }

      // Por ahora manejamos solo un item
      const item = items[0];
      
      console.log("Iniciando checkout con:", { item });

      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('id', item.customerId)
        .single();

      if (customerError) {
        console.error('Error getting customer:', customerError);
        throw customerError;
      }

      // Crear el pedido con método de pago "test"
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customerData.id,
          product_id: item.id,
          type: item.type,
          total_amount: item.price * item.quantity,
          quantity: item.quantity,
          payment_method: 'test',
          payment_status: 'completed', // Auto-completado para pruebas
          status: 'processing'
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
      }

      console.log("Pedido creado:", orderData);

      // Limpiar el carrito
      clearCart();

      // Redirigir a la página de agradecimiento
      navigate('/thank-you');

      toast({
        title: "¡Pedido realizado!",
        description: "Tu pedido de prueba ha sido procesado correctamente.",
      });

    } catch (error) {
      console.error('Error processing test checkout:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu pedido. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = items.some(item => item.type === "physical") ? 160 : 0;
  const total = subtotal + shipping;

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Resumen de tu pedido</h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            {shipping > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gastos de envío</span>
                <span className="font-medium">{formatCurrency(shipping)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-medium pt-4 border-t">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>

          {showCheckoutButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button 
                className="w-full mt-8 gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary animate-gradient"
                size="lg"
                onClick={handleCheckout}
              >
                Continuar al pago
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          <p className="mt-4 text-center text-sm text-gray-500">
            Pago seguro con SSL y principales métodos de pago
          </p>
        </>
      )}
    </motion.div>
  );
}