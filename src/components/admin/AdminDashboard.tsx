import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { format, subDays } from "date-fns"
import { es } from "date-fns/locale"
import { RecentActivity } from "./dashboard/RecentActivity"
import { StatsCards } from "./dashboard/StatsCards"
import { SalesChart } from "./dashboard/SalesChart"

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

  // Calculate total sales (mantener en centavos para precisión)
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

  const recentCustomers = customersData?.filter(customer => 
    new Date(customer.created_at || '') > thirtyDaysAgo
  ) || []

  // Preparar datos para el gráfico (mantener en centavos para precisión)
  const prepareSalesData = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), i)
      const dayOrders = ordersData?.filter(order => {
        const orderDate = new Date(order.created_at || '')
        return format(orderDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') &&
               order.payment_status === 'completed'
      }) || []
      
      const dailyTotal = dayOrders.reduce((sum, order) => sum + order.total_amount, 0)

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

      <StatsCards 
        totalSales={totalSales}
        recentCustomers={recentCustomers.length}
        activeOrders={activeOrders}
        todayActivations={todayActivations}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart data={salesData} />
        <RecentActivity />
      </div>
    </div>
  )
}