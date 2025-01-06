import { UIOrder } from "@/types/ui/orders"
import { ShippingAddress } from "@/types/database/common"

interface OrderDetailsProps {
  order: UIOrder;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  // Cast shipping_address to the correct type
  const shippingAddress = order.shipping_address as ShippingAddress | null;

  return (
    <div className="space-y-6">
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold mb-4">Detalles del pedido</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Número de orden:</span> {order.id}</p>
          <p><span className="font-medium">Cliente:</span> {order.customer?.name}</p>
          <p><span className="font-medium">Email:</span> {order.customer?.email}</p>
          <p><span className="font-medium">Fecha:</span> {new Date(order.created_at || '').toLocaleDateString()}</p>
          {shippingAddress && (
            <div>
              <p className="font-medium">Dirección de envío:</p>
              <p className="text-gray-600">
                {shippingAddress.street}<br />
                {shippingAddress.city}, {shippingAddress.state}<br />
                {shippingAddress.postal_code}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}