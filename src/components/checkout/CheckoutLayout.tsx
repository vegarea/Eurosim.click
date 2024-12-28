import { Header } from "@/components/Header"
import { Cart } from "@/components/cart/Cart"
import { PaymentSecurity } from "@/components/PaymentSecurity"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Bug } from "lucide-react"
import { motion } from "framer-motion"

interface CheckoutLayoutProps {
  children: ReactNode
  onLoadTestData: () => void
  showCheckoutButton?: boolean
  isButtonEnabled?: boolean
  onCheckout?: () => void
  isProcessing?: boolean
}

export function CheckoutLayout({ 
  children, 
  onLoadTestData,
  showCheckoutButton,
  isButtonEnabled,
  onCheckout,
  isProcessing
}: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onLoadTestData}
            className="flex items-center gap-2"
          >
            <Bug className="w-4 h-4" />
            Cargar datos de prueba
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
              {children}
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
                showCheckoutButton={showCheckoutButton} 
                isButtonEnabled={isButtonEnabled}
                onCheckout={onCheckout}
              />
              <div className="mt-4">
                <PaymentSecurity />
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}