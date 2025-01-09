import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, DollarSign, Users, Package } from "lucide-react"
import { formatCurrency } from "@/utils/currency"

interface StatsCardsProps {
  totalSales: number
  recentCustomers: number
  activeOrders: number
  todayActivations: number
}

export function StatsCards({ 
  totalSales, 
  recentCustomers, 
  activeOrders, 
  todayActivations 
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
          <DollarSign className="h-4 w-4 text-primary animate-bounce" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalSales)}
          </div>
          <p className="text-xs text-muted-foreground">
            Últimos 30 días
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
          <Users className="h-4 w-4 text-primary animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{recentCustomers}</div>
          <p className="text-xs text-muted-foreground">
            Últimos 30 días
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pedidos Activos</CardTitle>
          <Package className="h-4 w-4 text-primary animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{activeOrders}</div>
          <p className="text-xs text-muted-foreground">
            En proceso o envío
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50 to-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activaciones</CardTitle>
          <Activity className="h-4 w-4 text-primary animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{todayActivations}</div>
          <p className="text-xs text-muted-foreground">
            Activaciones hoy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}