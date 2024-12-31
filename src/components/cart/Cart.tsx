import { useCart } from "@/contexts/CartContext"
import { formatCurrency } from "@/utils/currency"
import { CartItem } from "./CartItem"

export function Cart() {
  const { items, updateQuantity, removeItem } = useCart()
  const total = items.reduce((sum, item) => sum + item.total_price, 0)

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item) => (
          <CartItem 
            key={item.id} 
            item={item}
            onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}