import { Database } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TypesCounter } from "./components/TypesCounter"
import { TypesList } from "./components/TypesList"

export function DatabaseStructure() {
  const totalTypes = 45
  const reviewedTypes = 12
  const detailedCounts = {
    components: 20,
    forms: 8,
    contexts: 5,
    hooks: 12
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Estructura de Tipos
          </CardTitle>
          <CardDescription>
            Estado actual de la migración de tipos a Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <TypesCounter
            totalTypes={totalTypes}
            reviewedTypes={reviewedTypes}
            detailedCounts={detailedCounts}
          />
          <TypesList />
        </CardContent>
      </Card>
    </div>
  )
}