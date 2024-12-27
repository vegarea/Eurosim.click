import { Order } from "../../orders/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"

interface ShippingTabsProps {
  pendingOrders: Order[]
  shippedOrders: Order[]
  deliveredOrders: Order[]
  columns: any[]
}

export function ShippingTabs({ 
  pendingOrders, 
  shippedOrders, 
  deliveredOrders, 
  columns 
}: ShippingTabsProps) {
  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pending" className="relative">
          En Preparación
          {pendingOrders.length > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 bg-blue-100 text-blue-800"
            >
              {pendingOrders.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="shipped">
          En Tránsito
          {shippedOrders.length > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 bg-orange-100 text-orange-800"
            >
              {shippedOrders.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="delivered">
          Entregados
          {deliveredOrders.length > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 bg-green-100 text-green-800"
            >
              {deliveredOrders.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending" className="mt-6">
        <DataTable 
          columns={columns} 
          data={pendingOrders}
        />
      </TabsContent>
      
      <TabsContent value="shipped" className="mt-6">
        <DataTable 
          columns={columns} 
          data={shippedOrders}
        />
      </TabsContent>

      <TabsContent value="delivered" className="mt-6">
        <DataTable 
          columns={columns} 
          data={deliveredOrders}
        />
      </TabsContent>
    </Tabs>
  )
}