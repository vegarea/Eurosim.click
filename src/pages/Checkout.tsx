import { Header } from "@/components/Header";
import { Cart } from "@/components/cart/Cart";
import { PaymentSecurity } from "@/components/PaymentSecurity";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { ESimForm } from "@/components/checkout/ESimForm";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { items } = useCart();
  const [step, setStep] = useState(1);
  
  const hasPhysicalSim = items.some(item => item.type === "physical");

  const handleShippingSubmit = (values: any) => {
    console.log('Shipping info:', values);
    setStep(2);
    // Aquí continuaríamos con el proceso de pago
  };

  const handleESimSubmit = (values: any) => {
    console.log('eSIM info:', values);
    setStep(2);
    // Aquí continuaríamos con el proceso de pago
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {hasPhysicalSim ? 'Información de envío' : 'Información de contacto'}
                </h2>
                {hasPhysicalSim ? (
                  <ShippingForm onSubmit={handleShippingSubmit} />
                ) : (
                  <ESimForm onSubmit={handleESimSubmit} />
                )}
              </div>
              <div>
                <Cart />
              </div>
            </div>
          )}
          
          <div className="mt-12">
            <PaymentSecurity />
          </div>
        </div>
      </main>
    </div>
  );
}