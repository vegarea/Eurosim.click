import { Header } from "@/components/Header";
import { Cart } from "@/components/cart/Cart";
import { PaymentSecurity } from "@/components/PaymentSecurity";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { DocumentationForm } from "@/components/checkout/DocumentationForm";
import { ESimForm } from "@/components/checkout/ESimForm";
import { useCart } from "@/contexts/CartContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Checkout() {
  const { items } = useCart();
  const [step, setStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({});
  
  const hasPhysicalSim = items.some(item => item.type === "physical");
  const progress = (step / 4) * 100; // Actualizado a 4 pasos

  const handleFormValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleFormSubmit = (values: any) => {
    setFormData({ ...formData, ...values });
    if (step < 4) { // Actualizado a 4 pasos
      setStep(step + 1);
      setIsFormValid(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            {hasPhysicalSim && (
              <Alert className="mb-6 bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Tienes un SIM físico en tu carrito. Por favor, proporciona tu información de envío.
                </AlertDescription>
              </Alert>
            )}
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
          </>
        );
      case 2:
        return (
          <DocumentationForm
            onSubmit={handleFormSubmit}
            onValidityChange={handleFormValidityChange}
          />
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Revisa tu información
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="font-medium">
                    {value instanceof Date ? format(value, "PPP", { locale: es }) : value as string}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Método de pago
            </h2>
            {/* Aquí iría el formulario de pago */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="max-w-5xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8 space-y-4 max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
              {['Información', 'Documentación', 'Revisión', 'Pago'].map((stepName, index) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Columna izquierda - Formulario */}
            <motion.div 
              className="lg:col-span-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver
                    </Button>
                  )}
                  {step < 4 && (
                    <Button
                      className="ml-auto flex items-center gap-2"
                      onClick={() => isFormValid && handleFormSubmit(formData)}
                      disabled={!isFormValid}
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Columna derecha - Resumen del carrito */}
            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-4">
                <Cart 
                  showCheckoutButton={step === 4} 
                  isButtonEnabled={isFormValid}
                  onCheckout={handleFormSubmit}
                />
                <div className="mt-4">
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
