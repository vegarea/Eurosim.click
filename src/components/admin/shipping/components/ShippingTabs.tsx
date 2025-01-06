import { Order } from "@/types/database/orders"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import { NoOrdersMessage } from "./NoOrdersMessage"
import { ColumnDef } from "@tanstack/react-table"

interface ShippingTabsProps {
  pendingOrders: Order[]
  shippedOrders: Order[]
  deliveredOrders: Order[]
  pendingColumns: ColumnDef<Order>[]
  shippedColumns: ColumnDef<Order>[]
  deliveredColumns: ColumnDef<Order>[]
}

export function ShippingTabs({ 
  pendingOrders, 
  shippedOrders, 
  deliveredOrders,
  pendingColumns,
  shippedColumns,
  deliveredColumns
}: ShippingTabsProps) {
  const renderOrdersTable = (orders: Order[], columns: ColumnDef<Order>[]) => {
    if (orders.length === 0) {
      return <NoOrdersMessage />
    }
    return <DataTable columns={columns} data={orders} />
  }

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
        {renderOrdersTable(pendingOrders, pendingColumns)}
      </TabsContent>
      
      <TabsContent value="shipped" className="mt-6">
        {renderOrdersTable(shippedOrders, shippedColumns)}
      </TabsContent>

      <TabsContent value="delivered" className="mt-6">
        {renderOrdersTable(deliveredOrders, deliveredColumns)}
      </TabsContent>
    </Tabs>
  )
}