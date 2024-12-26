import { Button } from "@/components/ui/button";
import { CartItem } from "./CartItem";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";

export function Cart() {
  const { toast } = useToast();
  const { items, removeItem, updateQuantity } = useCart();

  const handleCheckout = () => {
    // Implement checkout logic
    console.log("Proceeding to checkout");
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = items.some(item => item.type === "physical") ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Tu Carrito</h2>
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
              <span className="font-medium">${subtotal.toFixed(2)} MXN</span>
            </div>
            {shipping > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Envío</span>
                <span className="font-medium">${shipping.toFixed(2)} MXN</span>
              </div>
            )}
            <div className="flex justify-between text-base font-medium pt-4 border-t">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)} MXN</span>
            </div>
          </div>

          <Button 
            className="w-full mt-8 gap-2"
            size="lg"
            onClick={handleCheckout}
          >
            Continuar al pago
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Pago seguro con SSL y principales métodos de pago
          </p>
        </>
      )}
    </div>
  );
}
