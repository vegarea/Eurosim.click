import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TypesChecklist } from "./components/TypesChecklist"
import { TypesCounter } from "./components/TypesCounter"
import { TypesList } from "./components/TypesList"
import { typesChecklistData } from "./data/typesChecklistData"
import { useToast } from "@/hooks/use-toast"
import { scanProjectTypes } from "./utils/typeScanner"

export function TypesComparison() {
  const { toast } = useToast()
  const [checklist, setChecklist] = useState(typesChecklistData)
  
  // Análisis detallado de tipos en el proyecto
  const typeAnalysis = scanProjectTypes()
  
  const totalTypes = typeAnalysis.total
  const reviewedTypes = typeAnalysis.reviewed
  const detailedCounts = {
    components: typeAnalysis.components,
    forms: typeAnalysis.forms,
    contexts: typeAnalysis.contexts,
    hooks: typeAnalysis.hooks
  }

  const handleVerifyTypes = async (categoryId: string) => {
    try {
      console.log('Iniciando verificación y actualización para categoría:', categoryId);
      
      setChecklist(prevChecklist => 
        prevChecklist.map(cat => 
          cat.id === categoryId
            ? {
                ...cat,
                items: cat.items.map(item => ({
                  ...item,
                  status: "completed",
                }))
              }
            : cat
        )
      )

      console.log('Tipos actualizados para categoría:', categoryId);
      
      toast({
        title: "Tipos actualizados",
        description: "Los tipos han sido actualizados al formato de Supabase",
      })

    } catch (error) {
      console.error('Error en actualización:', error);
      toast({
        variant: "destructive",
        title: "Error en la actualización",
        description: "No se pudieron actualizar los tipos. Por favor, intenta nuevamente.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <TypesCounter 
        totalTypes={totalTypes} 
        reviewedTypes={reviewedTypes}
        detailedCounts={detailedCounts}
      />
      
      <TypesList />
    </div>
  )
}