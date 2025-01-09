import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ShoppingCart, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { formatCurrency } from "@/utils/currency"

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case 'processing':
      return <Clock className="w-4 h-4 text-blue-500" />
    case 'cancelled':
      return <XCircle className="w-4 h-4 text-red-500" />
    default:
      return <AlertCircle className="w-4 h-4 text-yellow-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-50'
    case 'processing':
      return 'text-blue-600 bg-blue-50'
    case 'cancelled':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-yellow-600 bg-yellow-50'
  }
}

export function RecentActivity() {
  const { data: ordersData } = useQuery({
    queryKey: ['dashboard-recent-orders'],
    queryFn: async () => {
      const { data: orders } = await supabase
        .from('orders')
        .select('*, customers(name, email)')
        .order('created_at', { ascending: false })
        .limit(5)
      return orders || []
    }
  })

  return (
    <Card className="col-span-3 hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50/50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ordersData?.map((order) => (
            <div key={order.id} className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Pedido #{order.id.slice(0, 8)}
                  </p>
                  <span className="text-xs text-gray-500">
                    {format(new Date(order.created_at || ''), 'dd MMM HH:mm', { locale: es })}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500 truncate">
                    {order.customers?.name || 'Cliente anónimo'}
                  </p>
                  <span className="text-xs font-medium text-primary">
                    {formatCurrency(order.total_amount)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {(!ordersData || ordersData.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay pedidos recientes
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}