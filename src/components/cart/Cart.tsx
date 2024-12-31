import { useCart } from "@/contexts/CartContext"
import { CartItem } from "./CartItem"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/utils/currency"
import { ShoppingCart } from "lucide-react"

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
  const { items, updateQuantity, removeItem } = useCart()

  const total = items.reduce((sum, item) => sum + item.total_price, 0)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((item) => (
          <CartItem 
            key={item.id} 
            item={item}
            onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Total:</span>
          <span className="text-xl font-bold">
            {formatCurrency(total)}
          </span>
        </div>

        {showCheckoutButton && (
          <Button
            onClick={onCheckout}
            disabled={!isButtonEnabled || items.length === 0}
            className="w-full"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Continuar al pago
          </Button>
        )}
      </div>
    </div>
  )
}