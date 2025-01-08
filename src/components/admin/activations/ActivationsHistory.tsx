import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Order } from "@/types/database/orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, User, Package, CheckCircle } from "lucide-react"

export function ActivationsHistory() {
  const { data: activationsHistory, isLoading } = useQuery({
    queryKey: ["activations-history"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          customer:customers(*)
        `)
        .lt("activation_date", new Date().toISOString())
        .order("activation_date", { ascending: false })

      if (error) throw error
      return data as Order[]
    }
  })

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="space-y-4">
      {activationsHistory?.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>
                  Activado el: {" "}
                  {order.activation_date && format(new Date(order.activation_date), "PPP", { locale: es })}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{order.customer?.name}</p>
                  <p className="text-sm text-gray-500">{order.customer?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">Pedido #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">{order.type === "physical" ? "SIM Física" : "eSIM"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}