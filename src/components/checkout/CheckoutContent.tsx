import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { ShippingForm } from "@/components/checkout/ShippingForm"
import { DocumentationForm } from "@/components/checkout/DocumentationForm"
import { PaymentStep } from "@/components/checkout/PaymentStep"
import { ESimForm } from "@/components/checkout/ESimForm"

interface CheckoutContentProps {
  step: number;
  hasPhysicalSim: boolean;
  isTestMode: boolean;
  testData: any;
  onFormSubmit: (values: any) => void;
  onFormValidityChange: (isValid: boolean) => void;
  formData: Record<string, any>;
  onUpdateField: (field: string, value: any) => void;
}

export function CheckoutContent({
  step,
  hasPhysicalSim,
  isTestMode,
  testData,
  onFormSubmit,
  onFormValidityChange,
  formData,
  onUpdateField
}: CheckoutContentProps) {
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
                onSubmit={onFormSubmit}
                onValidityChange={onFormValidityChange}
                initialData={isTestMode ? testData.shipping : undefined}
              />
            ) : (
              <ESimForm 
                onSubmit={onFormSubmit}
                onValidityChange={onFormValidityChange}
                initialData={isTestMode ? {
                  fullName: testData.documentation.fullName,
                  email: testData.documentation.email,
                  phone: testData.documentation.phone
                } : undefined}
              />
            )}
          </>
        );
      case 2:
        return (
          <DocumentationForm
            onSubmit={onFormSubmit}
            onValidityChange={onFormValidityChange}
            initialData={isTestMode ? testData.documentation : undefined}
          />
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Método de pago
            </h2>
            <PaymentStep />
          </div>
        );
      default:
        return null;
    }
  };

  return renderStepContent();
}