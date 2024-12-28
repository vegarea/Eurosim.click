import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/currency";

interface CartProps {
  showCheckoutButton?: boolean;
  isButtonEnabled?: boolean;
  onCheckout?: (values: any) => void;
}

export function Cart({ showCheckoutButton = true, isButtonEnabled = false, onCheckout }: CartProps) {
  const { toast } = useToast();
  const { items, removeItem, updateQuantity } = useCart();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout({});
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
                disabled={!isButtonEnabled}
              >
                Continuar al pago
                <ArrowRight className="h-4 w-4" />
              </Button>
              {!isButtonEnabled && (
                <p className="mt-2 text-center text-sm text-gray-500">
                  Por favor, completa todos los campos requeridos
                </p>
              )}
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