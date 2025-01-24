import { useCart } from "@/contexts/CartContext"
import { formatCurrency } from "@/utils/currency"
import { CartItem } from "./CartItem"
import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

export function Cart() {
  const { items, updateQuantity, removeItem } = useCart()
  const [shippingCost, setShippingCost] = useState(0)
  const subtotal = items.reduce((sum, item) => sum + item.total_price, 0)
  
  const hasPhysicalProducts = items.some(item => 
    item.metadata && (item.metadata as Record<string, any>).product_type === "physical"
  )

  useEffect(() => {
    async function fetchShippingCost() {
      if (hasPhysicalProducts) {
        const { data } = await supabase
          .from('shipping_settings')
          .select('shipping_cost')
          .eq('is_active', true)
          .single()
        
        if (data) {
          setShippingCost(data.shipping_cost)
        }
      } else {
        setShippingCost(0)
      }
    }

    fetchShippingCost()
  }, [hasPhysicalProducts])

  const total = subtotal + (hasPhysicalProducts ? shippingCost : 0)

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

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <div className="flex items-baseline gap-1">
            <span>{formatCurrency(subtotal)}</span>
            <span className="text-xs text-gray-500">MXN</span>
          </div>
        </div>
        
        {hasPhysicalProducts && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Costo de envío:</span>
            <div className="flex items-baseline gap-1">
              <span>{formatCurrency(shippingCost)}</span>
              <span className="text-xs text-gray-500">MXN</span>
            </div>
          </div>
        )}

        <div className="flex justify-between text-lg font-semibold pt-2 border-t">
          <span>Total:</span>
          <div className="flex items-baseline gap-1">
            <span>{formatCurrency(total)}</span>
            <span className="text-sm font-normal text-gray-500">MXN</span>
          </div>
        </div>
      </div>
    </div>
  );
}