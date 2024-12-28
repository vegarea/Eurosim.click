import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useCheckout } from "./useCheckout"
import { useNavigate } from "react-router-dom"
import { CheckoutFormData } from "@/types/checkout.types"

export function useCheckoutFlow() {
  const [step, setStep] = useState(1)
  const [isFormValid, setIsFormValid] = useState(false)
  const [formData, setFormData] = useState<Partial<CheckoutFormData>>({})
  const [isTestMode, setIsTestMode] = useState(false)
  const { toast } = useToast()
  const { processCheckout, isProcessing } = useCheckout()
  const navigate = useNavigate()

  const loadTestData = (hasPhysicalSim: boolean) => {
    console.log('Loading test data for checkout flow:', { hasPhysicalSim })
    const testData = {
      shipping: {
        fullName: "Juan Pérez",
        email: "juan@ejemplo.com",
        phone: "5512345678",
        address: "Calle Principal 123",
        city: "Ciudad de México",
        state: "CDMX",
        zipCode: "11111"
      },
      documentation: {
        fullName: "Juan Pérez",
        birthDate: new Date(),
        gender: "M",
        passportNumber: "AB123456",
        activationDate: new Date(),
        email: "juan@ejemplo.com",
        phone: "5512345678"
      }
    }
    
    const data = hasPhysicalSim ? 
      { ...testData.shipping, ...testData.documentation } :
      testData.documentation
    
    setFormData(data)
    setIsFormValid(true)
    setIsTestMode(true)
    
    toast({
      title: "Modo de prueba activado",
      description: "Se han cargado datos de prueba para facilitar el testing",
    })
  }

  const handleFormValidityChange = (isValid: boolean) => {
    console.log('Form validity changed:', isValid)
    setIsFormValid(isValid)
  }

  const handleFormSubmit = async (values: Partial<CheckoutFormData>) => {
    console.log('Form submitted with values:', values)
    
    if (step === 4) {
      console.log('Processing final checkout step with data:', formData)
      const success = await processCheckout(formData)
      if (success) {
        navigate('/payment')
      }
    } else {
      setFormData(prev => ({ ...prev, ...values }))
      setStep(step + 1)
      setIsFormValid(step === 3)
    }
  }

  const handleUpdateField = (field: string, value: any) => {
    console.log('Updating field:', field, 'with value:', value)
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleBack = () => {
    if (step > 1) {
      console.log('Moving back to step:', step - 1)
      setStep(step - 1)
      setIsFormValid(true)
    }
  }

  return {
    step,
    isFormValid,
    formData,
    isTestMode,
    isProcessing,
    loadTestData,
    handleFormValidityChange,
    handleFormSubmit,
    handleUpdateField,
    handleBack
  }
}