import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/currency";
import { useNavigate } from "react-router-dom";
import { checkoutService } from "@/services/checkoutService";

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

      // 1. Crear orden temporal
      const orderData = {
        productId: item.id,
        type: item.type,
        totalAmount: item.price * item.quantity,
        quantity: item.quantity,
        customerInfo: {
          name: item.customerName || 'Test Customer',
          email: item.customerEmail || 'test@example.com'
        }
      };

      const order = await checkoutService.createTemporaryOrder(orderData);
      console.log("Temporary order created:", order);

      // 2. Procesar pago de prueba
      const paymentResult = await checkoutService.processTestPayment(order.id);
      console.log("Payment processed:", paymentResult);

      // 3. Si el pago es exitoso, finalizar orden
      if (paymentResult.success) {
        const finalOrder = await checkoutService.finalizeOrder(order.id, paymentResult);
        console.log("Order finalized:", finalOrder);

        // Limpiar carrito y redirigir
        clearCart();
        navigate('/thank-you');

        toast({
          title: "¡Pedido realizado!",
          description: "Tu pedido de prueba ha sido procesado correctamente.",
        });
      } else {
        throw new Error(paymentResult.error || "Error procesando el pago");
      }

    } catch (error) {
      console.error('Error processing checkout:', error);
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