import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Header } from "@/components/Header";

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clear the cart when the thank you page loads
    clearCart();
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto" />
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>
          ) : (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h1 className="text-4xl font-bold text-gray-900">
                ¡Gracias por tu compra!
              </h1>
              <p className="text-lg text-gray-600">
                Hemos recibido tu pedido correctamente. Te enviaremos un email con los detalles y próximos pasos.
              </p>
              <div className="pt-8">
                <Button
                  onClick={() => window.location.href = '/'}
                  className="bg-brand hover:bg-brand/90"
                >
                  Volver al inicio
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}