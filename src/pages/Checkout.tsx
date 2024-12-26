import { Header } from "@/components/Header";
import { Cart } from "@/components/cart/Cart";
import { PaymentSecurity } from "@/components/PaymentSecurity";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { ESimForm } from "@/components/checkout/ESimForm";
import { useCart } from "@/contexts/CartContext";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Checkout() {
  const { items } = useCart();
  const [step, setStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const hasPhysicalSim = items.some(item => item.type === "physical");
  const progress = (step / 3) * 100;

  const handleFormValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleFormSubmit = (values: any) => {
    console.log('Form values:', values);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8 space-y-4">
            <div className="flex justify-between items-center">
              {['Información', 'Revisión', 'Pago'].map((stepName, index) => (
                <motion.div
                  key={stepName}
                  className={`flex items-center ${index + 1 <= step ? 'text-primary' : 'text-gray-400'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                    ${index + 1 <= step ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
                    {index + 1 <= step ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="ml-2 font-medium hidden sm:inline">{stepName}</span>
                </motion.div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Columna izquierda - Formulario */}
            <motion.div 
              className="lg:col-span-7 xl:col-span-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                      {hasPhysicalSim ? 'Información de envío' : 'Información de contacto'}
                    </h2>
                    {hasPhysicalSim ? (
                      <ShippingForm 
                        onSubmit={handleFormSubmit}
                        onValidityChange={handleFormValidityChange}
                      />
                    ) : (
                      <ESimForm 
                        onSubmit={handleFormSubmit}
                        onValidityChange={handleFormValidityChange}
                      />
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Columna derecha - Resumen del carrito */}
            <motion.div 
              className="lg:col-span-5 xl:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-4">
                <Cart 
                  showCheckoutButton={step === 1} 
                  isButtonEnabled={isFormValid}
                  onCheckout={handleFormSubmit}
                />
                <div className="mt-6">
                  <PaymentSecurity />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}