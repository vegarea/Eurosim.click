import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
      // Encontrar la categoría correspondiente
      const category = typesChecklistData.find(cat => cat.id === categoryId)
      
      if (!category) {
        throw new Error("Categoría no encontrada")
      }

      // Simular análisis de tipos (aquí iría la lógica real)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Determinar la sección correspondiente
      let targetTab = ""
      switch (categoryId) {
        case "orders":
        case "payments":
          targetTab = "checkout"
          break
        case "products":
        case "customers":
          targetTab = "admin"
          break
        case "auth":
        case "workflows":
          targetTab = "system"
          break
      }

      // Actualizar estado y mostrar notificación
      toast({
        title: "Verificación completada",
        description: `Los tipos de ${category.category} han sido analizados y documentados en la sección ${targetTab}`,
      })

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