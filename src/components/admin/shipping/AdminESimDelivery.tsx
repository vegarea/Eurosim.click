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
      console.log('🔍 Iniciando diagnóstico del sistema de envío de eSIM...')
      
      // Verificar plantilla de email
      const { data: template, error: templateError } = await supabase
        .from('email_templates')
        .select('*')
        .eq('type', 'esim')
        .eq('status', 'delivered')
        .eq('is_active', true)
        .single()

      if (templateError) {
        console.error('❌ Error al verificar plantilla:', templateError)
        throw templateError
      }

      console.log('✅ Plantilla encontrada:', template)

      // Verificar últimos logs de email
      const { data: logs, error: logsError } = await supabase
        .from('email_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (logsError) {
        console.error('❌ Error al verificar logs:', logsError)
        throw logsError
      }

      console.log('📧 Últimos logs de email:', logs)

      // Verificar trigger de email
      const { data: triggerInfo, error: triggerError } = await supabase
        .rpc('get_trigger_info', { trigger_name: 'trigger_new_order_email' })

      if (triggerError) {
        console.error('❌ Error al verificar trigger:', triggerError)
        throw triggerError
      }

      console.log('🔄 Información del trigger:', triggerInfo)

      toast({
        title: "Diagnóstico completado",
        description: "Revisa la consola para ver los resultados detallados"
      })

    } catch (error) {
      console.error('❌ Error en diagnóstico:', error)
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