import { Header } from "@/components/Header"
import { Cart } from "@/components/cart/Cart"
import { PaymentSecurity } from "@/components/PaymentSecurity"
import { useCart } from "@/contexts/CartContext"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader"
import { DocumentationForm } from "@/components/checkout/DocumentationForm"
import { ShippingForm } from "@/components/checkout/ShippingForm"
import { CustomerGender } from "@/types/database/enums"
import { CheckoutProvider, useCheckout } from "@/contexts/CheckoutContext"
import { Card } from "@/components/ui/card"
import { StripeCheckout } from "@/components/checkout/payment/StripeCheckout"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { PersonalInfoFields } from "@/components/checkout/shipping/PersonalInfoFields"

const testData = {
  shipping: {
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    phone: "5512345678",
    shipping_address: {
      street: "Calle Principal 123",
      city: "Ciudad de México",
      state: "CDMX",
      country: "Mexico",
      postal_code: "11111",
      phone: "5512345678"
    }
  },
  documentation: {
    passportNumber: "AB123456",
    birthDate: new Date(),
    gender: "M" as CustomerGender,
    activationDate: new Date()
  }
}

function CheckoutContent() {
  const { items } = useCart()
  const [isFormValid, setIsFormValid] = useState(false)
  const [isTestMode, setIsTestMode] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { state, updateCustomerInfo } = useCheckout()

  // Efecto para asegurar que la página se cargue desde arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const hasPhysicalSim = items.some(item => 
    item.metadata && (item.metadata as Record<string, any>).product_type === "physical"
  )

  const form = useForm({
    defaultValues: {
      name: state.customerInfo.name || "",
      email: state.customerInfo.email || "",
      phone: state.customerInfo.phone || "",
      shipping_address: {
        street: "",
        city: "",
        state: "",
        country: "Mexico",
        postal_code: "",
        phone: ""
      }
    }
  })

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
    
    setIsTestMode(true);
    setIsFormValid(true);
    
    toast({
      title: "Modo de prueba activado",
      description: "Se han cargado datos de prueba para facilitar el testing",
    });
  };

  const handleFormValidityChange = (isValid: boolean) => {
    console.log('Form validity changed:', isValid)
    setIsFormValid(isValid)
  }

  const handleFormSubmit = (values: any) => {
    console.log('Form submitted:', values)
    updateCustomerInfo({
      name: values.name,
      email: values.email,
      phone: values.phone
    })
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="max-w-7xl mx-auto">
          <CheckoutHeader onLoadTestData={loadTestData} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
            <motion.div 
              className="lg:col-span-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                {/* Información Personal siempre visible */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                      <PersonalInfoFields form={form} />
                    </form>
                  </Form>
                </Card>

                {/* Dirección de envío solo para SIM física */}
                {hasPhysicalSim && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
                    <ShippingForm
                      onSubmit={() => {}}
                      onValidityChange={handleFormValidityChange}
                      isTestMode={isTestMode}
                      testData={testData.shipping}
                      initialData={state.customerInfo}
                      skipPersonalInfo={true}
                    />
                  </Card>
                )}

                {/* Documentación UE siempre visible */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Documentación UE</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-700 text-sm">
                      Para cumplir con las regulaciones de la Unión Europea y poder asignarte un número local europeo,
                      necesitamos algunos datos adicionales. Esta información es requerida por las autoridades de telecomunicaciones.
                    </p>
                  </div>
                  <DocumentationForm
                    onSubmit={() => {}}
                    onValidityChange={handleFormValidityChange}
                    isTestMode={isTestMode}
                    testData={testData.documentation}
                    initialData={state.customerInfo}
                  />
                </Card>
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="lg:sticky lg:top-4 space-y-4">
                <Card className="p-6">
                  <Cart />
                  <div className="mt-4">
                    <StripeCheckout />
                  </div>
                </Card>
                
                <Card className="p-6">
                  <PaymentSecurity />
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Checkout() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  )
}