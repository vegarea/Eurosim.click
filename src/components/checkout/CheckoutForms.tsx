import { useState } from 'react'
import { DocumentationForm } from './DocumentationForm'
import { ShippingForm } from './ShippingForm'
import { PaymentStep } from './PaymentStep'
import { ReviewStep } from './ReviewStep'
import { useCart } from '@/contexts/CartContext'
import { OrderType, ShippingAddress } from '@/types/supabase'

export function CheckoutForms() {
  const { cart, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(0)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)
  const [orderType, setOrderType] = useState<OrderType>('physical')

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleShippingAddressChange = (address: ShippingAddress) => {
    setShippingAddress(address)
  }

  const handleOrderTypeChange = (type: OrderType) => {
    setOrderType(type)
  }

  const handleCompleteCheckout = () => {
    // Logic to complete the checkout process
    clearCart()
  }

  return (
    <div>
      {currentStep === 0 && (
        <ShippingForm
          onNext={handleNextStep}
          onShippingAddressChange={handleShippingAddressChange}
          orderType={orderType}
          onOrderTypeChange={handleOrderTypeChange}
        />
      )}
      {currentStep === 1 && (
        <PaymentStep
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          shippingAddress={shippingAddress}
        />
      )}
      {currentStep === 2 && (
        <ReviewStep
          onComplete={handleCompleteCheckout}
          onPrevious={handlePreviousStep}
          cart={cart}
          shippingAddress={shippingAddress}
        />
      )}
    </div>
  )
}
