import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, PackageCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order } from "../orders/types"
import { OrderStatusBadge } from "../orders/OrderStatusBadge"
import { useOrders } from "@/contexts/OrdersContext"
import { useState } from "react"
import { ShippingConfirmDialog } from "./ShippingConfirmDialog"

export function AdminPhysicalShipping() {
  const { toast } = useToast()
  const { orders, updateOrder } = useOrders()
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const physicalOrders = orders.filter(order => order.type === "physical")
  const pendingOrders = physicalOrders.filter(order => order.status === "processing")
  const shippedOrders = physicalOrders.filter(order => order.status === "shipped")
  const deliveredOrders = physicalOrders.filter(order => order.status === "delivered")

  const handleShipOrder = (order: Order) => {
    setSelectedOrderId(order.id)
    setConfirmDialogOpen(true)
  }

  const handleConfirmShipping = (trackingNumber: string, carrier: string) => {
    if (!selectedOrderId) return

    const now = new Date().toISOString()
    const event = {
      id: crypto.randomUUID(),
      type: "status_changed" as const,
      description: `Envío confirmado con ${carrier.toUpperCase()}. Tracking: ${trackingNumber}`,
      userId: "current-user-id", // Esto debería venir del contexto de autenticación
      userName: "Manager Name", // Esto debería venir del contexto de autenticación
      createdAt: now,
      metadata: {
        oldStatus: "processing",
        newStatus: "shipped",
        trackingNumber,
        carrier,
        automated: false
      }
    }

    updateOrder(selectedOrderId, {
      status: "shipped",
      events: [...(orders.find(o => o.id === selectedOrderId)?.events || []), event]
    })

    toast({
      title: "Envío confirmado",
      description: `El pedido ${selectedOrderId} ha sido marcado como enviado.`
    })
  }

  const handleDeliverOrder = (order: Order) => {
    const now = new Date().toISOString()
    const event = {
      id: crypto.randomUUID(),
      type: "status_changed" as const,
      description: "Pedido marcado como entregado",
      userId: "current-user-id", // Esto debería venir del contexto de autenticación
      userName: "Manager Name", // Esto debería venir del contexto de autenticación
      createdAt: now,
      metadata: {
        oldStatus: "shipped",
        newStatus: "delivered",
        automated: false
      }
    }

    updateOrder(order.id, {
      status: "delivered",
      events: [...(order.events || []), event]
    })

    toast({
      title: "Pedido entregado",
      description: `El pedido ${order.id} ha sido marcado como entregado.`
    })
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID Pedido"
    },
    {
      accessorKey: "customer",
      header: "Cliente"
    },
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ row }: any) => new Date(row.getValue("date")).toLocaleDateString()
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }: any) => {
        const status = row.getValue("status")
        return <OrderStatusBadge status={status} />
      }
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const order = row.original
        const isProcessing = order.status === "processing"
        const isShipped = order.status === "shipped"
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShipOrder(order)}
              disabled={!isProcessing}
            >
              <Truck className="w-4 h-4 mr-2" />
              Confirmar Envío
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeliverOrder(order)}
              disabled={!isShipped}
            >
              <PackageCheck className="w-4 h-4 mr-2" />
              Marcar como entregado
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestión de Envíos Físicos</h1>
        <p className="text-muted-foreground">
          Gestiona los envíos de SIMs físicas y actualiza su estado
        </p>
      </div>

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

      <ShippingConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        orderId={selectedOrderId || ""}
        onConfirm={handleConfirmShipping}
      />
    </div>
  )
}