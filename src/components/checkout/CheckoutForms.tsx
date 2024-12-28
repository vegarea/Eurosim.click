import { Progress } from "@/components/ui/progress"
import { ShippingForm } from "./ShippingForm"
import { DocumentationForm } from "./DocumentationForm"
import { ReviewStep } from "./ReviewStep"
import { PaymentStep } from "./PaymentStep"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function CheckoutForms() {
  const [step, setStep] = useState(1)
  const [isFormValid, setIsFormValid] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  
  const progress = (step / 4) * 100

  const handleFormValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid)
  }

  const handleFormSubmit = (values: any) => {
    setFormData({ ...formData, ...values })
    if (step < 4) {
      setStep(step + 1)
      setIsFormValid(step === 3) // Mantenemos la validación activa en el paso de revisión
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setIsFormValid(true)
    }
  }

  const handleUpdateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ShippingForm 
            onSubmit={handleFormSubmit}
            onValidityChange={handleFormValidityChange}
            initialData={formData}
          />
        )
      case 2:
        return (
          <DocumentationForm
            onSubmit={handleFormSubmit}
            onValidityChange={handleFormValidityChange}
            initialData={formData}
          />
        )
      case 3:
        return (
          <ReviewStep
            formData={formData}
            onUpdateField={handleUpdateField}
          />
        )
      case 4:
        return <PaymentStep />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
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
                {index + 1}
              </div>
              <span className="ml-2 font-medium hidden sm:inline">{stepName}</span>
            </motion.div>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

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
  )
}