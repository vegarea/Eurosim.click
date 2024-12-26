import { Header } from "@/components/Header";
import { Cart } from "@/components/cart/Cart";
import { PaymentSecurity } from "@/components/PaymentSecurity";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { ESimForm } from "@/components/checkout/ESimForm";
import { useCart } from "@/contexts/CartContext";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function Checkout() {
  const { items } = useCart();
  const [step, setStep] = useState(1);
  
  const hasPhysicalSim = items.some(item => item.type === "physical");
  const progress = (step / 2) * 100;

  const handleShippingSubmit = (values: any) => {
    console.log('Shipping info:', values);
    setStep(2);
  };

  const handleESimSubmit = (values: any) => {
    console.log('eSIM info:', values);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Columna izquierda - Formulario */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="mb-8 space-y-4">
                <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {step === 1 ? 'Información de contacto' : 'Resumen y pago'}
                </h1>
                <Progress value={progress} className="w-full" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span className={step >= 1 ? "text-primary font-medium" : ""}>
                    Información
                  </span>
                  <span className={step >= 2 ? "text-primary font-medium" : ""}>
                    Pago
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {step === 1 && (
                  <div className="animate-fade-in">
                    {hasPhysicalSim ? (
                      <ShippingForm onSubmit={handleShippingSubmit} />
                    ) : (
                      <ESimForm onSubmit={handleESimSubmit} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha - Resumen del carrito */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <Cart />
              <div className="mt-6">
                <PaymentSecurity />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}