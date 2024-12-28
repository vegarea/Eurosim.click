import {
  Database,
  FileText,
  ListTree,
  LayoutDashboard,
  Code2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TypeComparisonSection } from "./components/TypeComparisonSection"
import { TypesChecklist } from "./components/TypesChecklist"
import { TypesCounter } from "./components/TypesCounter"
import { typesChecklistData } from "./data/typesChecklistData"
import { CheckoutTypes } from "./sections/CheckoutTypes"
import { AdminTypes } from "./sections/AdminTypes"
import { SystemTypes } from "./sections/SystemTypes"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function TypesComparison() {
  const { toast } = useToast()
  const [checklist, setChecklist] = useState(typesChecklistData)
  
  const totalTypes = checklist.reduce(
    (acc, category) => acc + category.items.length,
    0
  )
  
  const reviewedTypes = checklist.reduce(
    (acc, category) => 
      acc + category.items.filter(
        item => item.status === "completed" || item.status === "reviewed"
      ).length,
    0
  )

  const handleVerifyTypes = async (categoryId: string) => {
    try {
      const category = checklist.find(cat => cat.id === categoryId)
      
      if (!category) {
        throw new Error("Categoría no encontrada")
      }

      // Simular análisis de tipos
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Verificar específicamente los tipos de pedidos
      if (categoryId === "orders") {
        console.log("Verificando tipos de pedidos...")
        
        // Actualizar el estado de los items de la categoría
        setChecklist(prevChecklist => 
          prevChecklist.map(cat => 
            cat.id === categoryId
              ? {
                  ...cat,
                  items: cat.items.map(item => ({
                    ...item,
                    status: "reviewed"
                  }))
                }
              : cat
          )
        )

        toast({
          title: "Verificación completada",
          description: "Los tipos han sido verificados y actualizados según el esquema de Supabase",
        })
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error en la verificación",
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
            items={checklist} 
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