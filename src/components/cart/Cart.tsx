import { useCart } from "@/contexts/CartContext"
import { formatCurrency } from "@/utils/currency"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { OrderItemMetadata } from "@/types/database/common"

interface CartProps {
  showCheckoutButton?: boolean
  isButtonEnabled?: boolean
}

export function Cart({ showCheckoutButton = true, isButtonEnabled = true }: CartProps) {
  const { items, total } = useCart()
  const { toast } = useToast()

  const handleCheckout = async () => {
    try {
      const { data: { url }, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          items: items.map(item => ({
            title: (item.metadata as OrderItemMetadata)?.product_title,
            description: (item.metadata as OrderItemMetadata)?.product_description,
            unit_price: item.unit_price,
            quantity: item.quantity,
          })),
          metadata: {
            requiresShipping: items.some(item => 
              item.metadata && (item.metadata as OrderItemMetadata)?.product_type === "physical"
            ),
          }
        }
      })

      if (error) throw error
      if (!url) throw new Error('No se recibió URL de checkout')

      window.location.href = url
    } catch (error) {
      console.error('Error iniciando checkout:', error)
      toast({
        title: "Error",
        description: "No se pudo iniciar el proceso de pago",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">{(item.metadata as OrderItemMetadata)?.product_title}</h3>
            <p className="text-sm text-gray-500">{(item.metadata as OrderItemMetadata)?.product_description}</p>
          </div>
          <div>
            <span className="font-bold">{formatCurrency(item.total_price)}</span>
          </div>
        </div>
      ))}
      
      {showCheckoutButton && items.length > 0 && (
        <Button 
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={!isButtonEnabled}
        >
          Pagar {formatCurrency(total)}
        </Button>
      )}
    </div>
  )
}