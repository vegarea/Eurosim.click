import { useCart } from "@/contexts/CartContext"
import { CartItem } from "./CartItem"
import { formatCurrency } from "@/utils/currency"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export function Cart() {
  const { items, total } = useCart()
  const { toast } = useToast()

  const showAddedToCartToast = () => {
    toast({
      title: "Producto añadido al carrito",
      duration: 2000, // 2 segundos
      className: "bottom-0",
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} onAdd={showAddedToCartToast} />
        ))}
      </div>
      
      {items.length > 0 && (
        <>
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </div>
  )
}