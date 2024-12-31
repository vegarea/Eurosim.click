import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { formatCurrency } from "@/utils/currency"
import { CartItem } from "./CartItem"
import { useLocation } from "react-router-dom"

interface CartProps {
  showCheckoutButton?: boolean
  isButtonEnabled?: boolean
  onCheckout?: () => void
}

export function Cart({ 
  showCheckoutButton = false, 
  isButtonEnabled = true,
  onCheckout 
}: CartProps) {
  const { items } = useCart()
  const location = useLocation()
  const isCheckoutPage = location.pathname === '/checkout'

  const total = items.reduce((sum, item) => sum + item.total_price, 0)

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {showCheckoutButton && !isCheckoutPage && (
        <Button
          onClick={onCheckout}
          disabled={!isButtonEnabled || items.length === 0}
          className="w-full mt-4"
        >
          Ir al checkout
        </Button>
      )}
    </div>
  )
}