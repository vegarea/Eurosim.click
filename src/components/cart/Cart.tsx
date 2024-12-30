import { useCart } from "@/contexts/CartContext"
import { CartItem } from "./CartItem"
import { TestPaymentButton } from "../checkout/payment/TestPaymentButton"
import { formatCurrency } from "@/utils/currency"

interface CartProps {
  showCheckoutButton?: boolean
  isButtonEnabled?: boolean
  onCheckout?: () => void
  formData?: Record<string, any>
}

export function Cart({ 
  showCheckoutButton = false, 
  isButtonEnabled = true,
  onCheckout,
  formData = {}
}: CartProps) {
  const { items } = useCart()
  const total = items.reduce((sum, item) => sum + item.total_price, 0)

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Tu carrito está vacío</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <div className="pt-4">
          {process.env.NODE_ENV === 'development' ? (
            <TestPaymentButton formData={formData} />
          ) : (
            <button
              className="w-full px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
              disabled={!isButtonEnabled}
              onClick={onCheckout}
            >
              Proceder al pago
            </button>
          )}
        </div>
      )}
    </div>
  )
}