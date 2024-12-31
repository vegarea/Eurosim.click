import { Header } from "@/components/Header"
import { Cart } from "@/components/cart/Cart"
import { PaymentSecurity } from "@/components/PaymentSecurity"
import { useCart } from "@/contexts/CartContext"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Json } from "@/types/database/common"
import { useNavigate } from "react-router-dom"
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader"
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress"
import { CheckoutContent } from "@/components/checkout/CheckoutContent"
import { CheckoutNavigation } from "@/components/checkout/CheckoutNavigation"

const testData = {
  shipping: {
    fullName: "Juan Pérez",
    email: "juan@ejemplo.com",
    phone: "+525512345678",
    address: "Calle Principal 123",
    city: "Ciudad de México",
    state: "CDMX",
    zipCode: "11111",
    shippingAddress: {
      street: "Calle Principal 123",
      city: "Ciudad de México",
      state: "CDMX",
      country: "México",
      postal_code: "11111",
      phone: "+525512345678"
    }
  },
  documentation: {
    fullName: "Juan Pérez",
    birthDate: new Date().toISOString().split('T')[0],
    gender: "M",
    passportNumber: "AB123456",
    activationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    email: "juan@ejemplo.com",
    phone: "+525512345678"
  }
}

export default function Checkout() {
  const { items } = useCart()
  const [step, setStep] = useState(1)
  const [isFormValid, setIsFormValid] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [isTestMode, setIsTestMode] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  
  const hasPhysicalSim = items.some(item => 
    item.metadata && (item.metadata as Record<string, any>).product_type === "physical"
  )

  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos a tu carrito para continuar con la compra",
        variant: "destructive",
      })
      navigate('/')
    }
  }, [items, navigate, toast])

  const loadTestData = () => {
    const data = hasPhysicalSim ? 
      { ...testData.shipping, ...testData.documentation } :
      testData.documentation;
    
    setFormData(data);
    setIsFormValid(true);
    setIsTestMode(true);
    
    toast({
      title: "Modo de prueba activado",
      description: "Se han cargado datos de prueba para facilitar el testing",
    });

    console.log("Datos de prueba cargados:", data);
  };

  const handleFormValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid)
  }

  const handleFormSubmit = (values: any) => {
    const formDataWithShippingAddress = {
      ...values,
      shipping_address: values.shippingAddress as unknown as Json
    };
    
    setFormData({ ...formData, ...formDataWithShippingAddress });
    if (step < 3) {
      setStep(step + 1);
      setIsFormValid(false);
    }
  }

  const handleUpdateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setIsFormValid(true)
    }
  }

  const handleCheckout = () => {
    handleFormSubmit(formData);
  }

  useEffect(() => {
    if (step === 3) {
      setIsFormValid(true)
    }
  }, [step])

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="max-w-5xl mx-auto">
          <CheckoutHeader onLoadTestData={loadTestData} />
          <CheckoutProgress step={step} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div 
              className="lg:col-span-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
                <CheckoutContent
                  step={step}
                  hasPhysicalSim={hasPhysicalSim}
                  isTestMode={isTestMode}
                  testData={testData}
                  onFormSubmit={handleFormSubmit}
                  onFormValidityChange={handleFormValidityChange}
                  formData={formData}
                  onUpdateField={handleUpdateField}
                />
                
                <CheckoutNavigation
                  step={step}
                  isFormValid={isFormValid}
                  onBack={handleBack}
                  onSubmit={handleFormSubmit}
                  formData={formData}
                />
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-4">
                <Cart 
                  showCheckoutButton={step === 3} 
                  isButtonEnabled={isFormValid}
                  onCheckout={handleCheckout}
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
  )
}