import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, DollarSign, Users, Package } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { formatCurrency } from "@/utils/currency"

interface DashboardStats {
  totalSales: number
  newCustomers: number
  activeOrders: number
  activations: number
  recentOrders: {
    id: string
    created_at: string
    total_amount: number
  }[]
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    newCustomers: 0,
    activeOrders: 0,
    activations: 0,
    recentOrders: []
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Obtener ventas totales (suma de total_amount de órdenes completadas)
      const { data: salesData } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('payment_status', 'completed')

      const totalSales = salesData?.reduce((acc, order) => acc + order.total_amount, 0) || 0

      // Obtener número de clientes nuevos en el último mes
      const { count: newCustomers } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

      // Obtener número de pedidos activos (processing)
      const { count: activeOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'processing')

      // Obtener activaciones recientes (últimas 24 horas)
      const { count: activations } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .not('activation_date', 'is', null)
        .gte('activation_date', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

      // Obtener órdenes recientes
      const { data: recentOrders } = await supabase
        .from('orders')
        .select('id, created_at, total_amount')
        .order('created_at', { ascending: false })
        .limit(3)

      setStats({
        totalSales,
        newCustomers: newCustomers || 0,
        activeOrders: activeOrders || 0,
        activations: activations || 0,
        recentOrders: recentOrders || []
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-48">Cargando estadísticas...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido al panel de administración
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Última actualización: {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-primary animate-bounce" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</div>
            <p className="text-xs text-muted-foreground">
              Total de ventas completadas
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Clientes</CardTitle>
            <Users className="h-4 w-4 text-primary animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.newCustomers}</div>
            <p className="text-xs text-muted-foreground">
              En los últimos 30 días
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Activos</CardTitle>
            <Package className="h-4 w-4 text-primary animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.activeOrders}</div>
            <p className="text-xs text-muted-foreground">
              Pedidos en procesamiento
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actividad</CardTitle>
            <Activity className="h-4 w-4 text-primary animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.activations}</div>
            <p className="text-xs text-muted-foreground">
              Activaciones en las últimas 24h
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50/50 to-white">
          <CardHeader>
            <CardTitle>Resumen de Ventas</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[240px] flex items-center justify-center text-muted-foreground">
              Aquí irá el gráfico de ventas
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50/50 to-white">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Nuevo pedido #{order.id.slice(-4)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(order.total_amount)} - Hace {
                        Math.round((Date.now() - new Date(order.created_at).getTime()) / (1000 * 60))
                      } minutos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}