import { useToast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Check, AlertCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Order } from "@/types/database/orders"
import { OrderStatusBadge } from "../orders/OrderStatusBadge"
import { useESimDelivery } from "./hooks/useESimDelivery"
import { supabase } from "@/integrations/supabase/client"

export function AdminESimDelivery() {
  const { pendingOrders, completedOrders, handleSendQR, handleMarkDelivered } = useESimDelivery()
  const { toast } = useToast()

  const runDiagnostic = async () => {
    try {
      toast({
        title: "Ejecutando diagnóstico...",
        description: "Por favor espera mientras verificamos el sistema"
      })

      const { data, error } = await supabase.functions.invoke('diagnostic-check')

      if (error) throw error

      console.log('Resultados del diagnóstico:', data)

      toast({
        title: "Diagnóstico completado",
        description: "Revisa la consola para ver los resultados detallados"
      })

    } catch (error) {
      console.error('Error en diagnóstico:', error)
      toast({
        variant: "destructive",
        title: "Error en diagnóstico",
        description: "No se pudo completar el diagnóstico. Revisa la consola para más detalles."
      })
    }
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID Pedido"
    },
    {
      accessorKey: "customer",
      header: "Cliente",
      cell: ({ row }: any) => {
        const order = row.original
        return <span>{order.customer?.name || 'Cliente no registrado'}</span>
      }
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
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendQR(order)}
              disabled={!isProcessing}
            >
              <Mail className="w-4 h-4 mr-2" />
              Enviar QR
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleMarkDelivered(order)}
              disabled={!isProcessing}
            >
              <Check className="w-4 h-4 mr-2" />
              Marcar como entregado
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Envíos E-SIM</h1>
          <p className="text-muted-foreground">
            Gestiona el envío de QR por email para E-SIMs y actualiza su estado
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={runDiagnostic}
          className="flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4" />
          Ejecutar Diagnóstico
        </Button>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
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
          <TabsTrigger value="completed">
            Envíos Completados
            {completedOrders.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 bg-green-100 text-green-800"
              >
                {completedOrders.length}
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
        
        <TabsContent value="completed" className="mt-6">
          <DataTable 
            columns={columns} 
            data={completedOrders}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}