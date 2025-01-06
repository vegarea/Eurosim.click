import { UIOrder } from "@/types/ui/orders"
import { formatCurrency } from "@/utils/currency"

interface OrderItemsProps {
  order: UIOrder;
  shippingCost?: number;
}

export function OrderItems({ order, shippingCost }: OrderItemsProps) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-semibold mb-4">Productos</h3>
      {order.items?.map((item, index) => (
        <div key={index} className="flex justify-between py-2">
          <div>
            <p className="font-medium">{item.metadata?.product_title}</p>
            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
          </div>
          <p className="font-medium">
            {formatCurrency(item.total_price)}
          </p>
        </div>
      ))}
      
      {order.type === 'physical' && shippingCost !== undefined && (
        <div className="flex justify-between py-2 border-t border-gray-100 mt-2">
          <p className="font-medium">Costo de envío</p>
          <p className="font-medium">
            {formatCurrency(shippingCost)}
          </p>
        </div>
      )}

      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">
            {formatCurrency(order.total_amount)}
          </p>
        </div>
      </div>
    </div>
  )
}