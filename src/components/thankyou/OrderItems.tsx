import { OrderWithRelations } from "@/types/ui/orders"

interface OrderItemsProps {
  order: OrderWithRelations;
  shippingCost?: number;
}

export function OrderItems({ order, shippingCost }: OrderItemsProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium">Items del pedido</h3>
      <div className="mt-4 space-y-4">
        {order.items?.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.quantity}x Producto</span>
            <span>${(item.total_price / 100).toFixed(2)}</span>
          </div>
        ))}
        {shippingCost && (
          <div className="flex justify-between border-t pt-4">
            <span>Costo de envío</span>
            <span>${(shippingCost / 100).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between border-t pt-4 font-bold">
          <span>Total</span>
          <span>${(order.total_amount / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}