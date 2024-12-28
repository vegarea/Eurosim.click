import { Header } from "@/components/Header"
import { Cart } from "@/components/cart/Cart"
import { PaymentSecurity } from "@/components/PaymentSecurity"
import { EmptyCartMessage } from "@/components/checkout/EmptyCartMessage"
import { CheckoutForms } from "@/components/checkout/CheckoutForms"
import { useCart } from "@/contexts/CartContext"

export default function Checkout() {
  const { items } = useCart()
  const hasItems = items.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-8 px-4 max-w-5xl">
        {!hasItems ? (
          <EmptyCartMessage />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <CheckoutForms />
            </div>
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-4">
                <Cart />
                <div className="mt-4">
                  <PaymentSecurity />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}