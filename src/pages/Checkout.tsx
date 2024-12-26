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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 space-y-4">
            <h1 className="text-2xl font-bold text-center">
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

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-fade-in">
            {step === 1 ? (
              <div className="space-y-6">
                {hasPhysicalSim ? (
                  <ShippingForm onSubmit={handleShippingSubmit} />
                ) : (
                  <ESimForm onSubmit={handleESimSubmit} />
                )}
              </div>
            ) : (
              <Cart />
            )}
          </div>
          
          <div className="mt-8">
            <PaymentSecurity />
          </div>
        </div>
      </main>
    </div>
  );
}