import { UIOrder } from "@/types/ui/orders"
import { formatCurrency } from "@/utils/currency"

interface OrderDetailsProps {
  order: UIOrder;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold mb-4">Detalles del pedido</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Número de orden:</span> {order.id}</p>
          <p><span className="font-medium">Cliente:</span> {order.customer?.name}</p>
          <p><span className="font-medium">Email:</span> {order.customer?.email}</p>
          <p><span className="font-medium">Fecha:</span> {new Date(order.created_at || '').toLocaleDateString()}</p>
          {order.shipping_address && (
            <div>
              <p className="font-medium">Dirección de envío:</p>
              <p className="text-gray-600">
                {order.shipping_address.street}<br />
                {order.shipping_address.city}, {order.shipping_address.state}<br />
                {order.shipping_address.postal_code}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}