import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, DollarSign, Users, Package } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format, subDays } from "date-fns"
import { es } from "date-fns/locale"

export function AdminDashboard() {
  // Fetch orders data
  const { data: ordersData } = useQuery({
    queryKey: ['dashboard-orders'],
    queryFn: async () => {
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
      return orders || []
    }
  })

  // Fetch customers data
  const { data: customersData } = useQuery({
    queryKey: ['dashboard-customers'],
    queryFn: async () => {
      const { data: customers } = await supabase
        .from('customers')
        .select('*')
      return customers || []
    }
  })

  // Calculate total sales
  const totalSales = ordersData?.reduce((acc, order) => 
    order.payment_status === 'completed' ? acc + order.total_amount : acc, 0
  ) || 0

  // Get active orders (processing or shipped)
  const activeOrders = ordersData?.filter(order => 
    ['processing', 'shipped'].includes(order.status)
  ).length || 0

  // Get today's activations
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  
  const todayActivations = ordersData?.filter(order => {
    if (!order.activation_date) return false
    const activationDate = new Date(order.activation_date)
    return activationDate >= todayStart
  }).length || 0

  // Calculate percentage changes (using last 30 days as comparison)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentOrders = ordersData?.filter(order => 
    new Date(order.created_at || '') > thirtyDaysAgo
  ) || []

  const recentCustomers = customersData?.filter(customer => 
    new Date(customer.created_at || '') > thirtyDaysAgo
  ) || []

  // Preparar datos para el gráfico
  const prepareSalesData = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), i)
      const dayOrders = ordersData?.filter(order => {
        const orderDate = new Date(order.created_at || '')
        return format(orderDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') &&
               order.payment_status === 'completed'
      }) || []
      
      const dailyTotal = dayOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0) / 100

      return {
        date: format(date, 'dd MMM', { locale: es }),
        ventas: dailyTotal
      }
    }).reverse()

    return last30Days
  }

  const salesData = prepareSalesData()

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
            <div className="text-2xl font-bold">
              ${(totalSales / 100).toFixed(2)}
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
            <div className="text-2xl font-bold">+{recentCustomers.length}</div>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50/50 to-white">
          <CardHeader>
            <CardTitle>Resumen de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E02653" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#E02653" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#666', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#666', fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `€${value}`}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 shadow-lg rounded-lg border">
                            <p className="text-sm font-medium">{payload[0].payload.date}</p>
                            <p className="text-sm text-primary">
                              €{payload[0].value.toFixed(2)}
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ventas"
                    stroke="#E02653"
                    strokeWidth={2}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 hover:shadow-lg transition-shadow bg-gradient-to-br from-brand-50/50 to-white">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {ordersData?.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Nuevo pedido #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at || '').toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!ordersData || ordersData.length === 0) && (
                <p className="text-sm text-muted-foreground">
                  No hay pedidos recientes
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}