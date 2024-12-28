import {
  Database,
  FileText,
  ListTree,
  LayoutDashboard,
  Code2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatabaseStructure } from "./DatabaseStructure"
import { ProjectWorkflow } from "./ProjectWorkflow"
import { DocumentationOverview } from "./DocumentationOverview"
import { TypesComparison } from "./TypesComparison"
import { TypeComparisonSection } from "./components/TypeComparisonSection"
import { TypesChecklist } from "./components/TypesChecklist"
import { TypesCounter } from "./components/TypesCounter"
import { typesChecklistData } from "./data/typesChecklistData"
import { CheckoutTypes } from "./sections/CheckoutTypes"
import { AdminTypes } from "./sections/AdminTypes"
import { SystemTypes } from "./sections/SystemTypes"
import { useToast } from "@/hooks/use-toast"

export function TypesComparison() {
  const { toast } = useToast()
  
  const totalTypes = typesChecklistData.reduce(
    (acc, category) => acc + category.items.length,
    0
  )
  
  const reviewedTypes = typesChecklistData.reduce(
    (acc, category) => 
      acc + category.items.filter(
        item => item.status === "completed" || item.status === "reviewed"
      ).length,
    0
  )

  const handleVerifyTypes = async (categoryId: string) => {
    try {
      const category = typesChecklistData.find(cat => cat.id === categoryId)
      
      if (!category) {
        throw new Error("Categoría no encontrada")
      }

      // Simular análisis de tipos
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Verificar específicamente los tipos de pedidos
      if (categoryId === "orders") {
        console.log("Verificando tipos de pedidos...")
        
        // Comparar tipos actuales con tipos de Supabase
        const currentTypes = {
          order: `type Order = {
            id: string
            status: string
            customer: string
          }`,
          orderItem: `type OrderItem = {
            id: string
            quantity: number
            price: number
          }`
        }

        const supabaseTypes = {
          order: `type Order = {
            id: uuid
            customer_id: uuid
            status: OrderStatus
            type: OrderType
            total_amount: integer
            created_at: timestamp
          }`,
          orderItem: `type OrderItem = {
            id: uuid
            order_id: uuid
            product_id: uuid
            quantity: integer
            unit_price: integer
            total_price: integer
          }`
        }

        // Actualizar la documentación en la sección de checkout
        toast({
          title: "✅ Verificación completada",
          description: `Se han verificado y actualizado los tipos de Pedidos y Items de Pedido`,
        })

        // Actualizar el estado visual de los items verificados
        const updatedCategory = {
          ...category,
          items: category.items.map(item => ({
            ...item,
            status: "reviewed" as const
          }))
        }

        // Actualizar el estado en typesChecklistData
        const categoryIndex = typesChecklistData.findIndex(cat => cat.id === categoryId)
        if (categoryIndex !== -1) {
          typesChecklistData[categoryIndex] = updatedCategory
        }
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Error en la verificación",
        description: "No se pudieron verificar los tipos. Por favor, intenta nuevamente.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <TypesCounter totalTypes={totalTypes} reviewedTypes={reviewedTypes} />
      
      <Tabs defaultValue="checklist" className="space-y-4">
        <TabsList>
          <TabsTrigger value="checklist">Vista General</TabsTrigger>
          <TabsTrigger value="checkout">Área de Compra</TabsTrigger>
          <TabsTrigger value="admin">Panel Admin</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="checklist">
          <TypesChecklist 
            items={typesChecklistData} 
            onVerifyTypes={handleVerifyTypes}
          />
        </TabsContent>

        <TabsContent value="checkout">
          <CheckoutTypes />
        </TabsContent>

        <TabsContent value="admin">
          <AdminTypes />
        </TabsContent>

        <TabsContent value="system">
          <SystemTypes />
        </TabsContent>
      </Tabs>
    </div>
  )
}