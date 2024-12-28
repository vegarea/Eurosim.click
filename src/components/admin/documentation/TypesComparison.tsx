import { useState } from "react"
import { TypesCounter } from "./components/TypesCounter"
import { TypesList } from "./components/TypesList"
import { useToast } from "@/hooks/use-toast"
import { scanProjectTypes } from "./utils/typeScanner"

export function TypesComparison() {
  const { toast } = useToast()
  
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