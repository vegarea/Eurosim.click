import { Database, ListChecks } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TypesCounterProps {
  totalTypes: number
  reviewedTypes: number
  detailedCounts: {
    components: number
    forms: number
    contexts: number
    hooks: number
  }
}

export function TypesCounter({ 
  totalTypes, 
  reviewedTypes,
  detailedCounts 
}: TypesCounterProps) {
  const percentage = Math.round((reviewedTypes / totalTypes) * 100) || 0

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tipos</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTypes}</div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                Tipos definidos en la plataforma
              </p>
              <ul className="text-xs text-muted-foreground">
                <li>Componentes: {detailedCounts.components}</li>
                <li>Formularios: {detailedCounts.forms}</li>
                <li>Contextos: {detailedCounts.contexts}</li>
                <li>Hooks: {detailedCounts.hooks}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tipos Revisados</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{reviewedTypes}</div>
              <Progress value={percentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {percentage}% completado
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {percentage < 100 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800">
              <strong>Atención:</strong> Aún hay tipos que necesitan ser revisados y actualizados 
              al formato de Supabase. Asegúrate de revisar todos los componentes, formularios, 
              contextos y hooks.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}