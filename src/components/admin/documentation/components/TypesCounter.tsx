import { Database, ListChecks } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TypesCounterProps {
  totalTypes: number
  reviewedTypes: number
}

export function TypesCounter({ totalTypes, reviewedTypes }: TypesCounterProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Tipos</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTypes}</div>
          <p className="text-xs text-muted-foreground">
            Tipos definidos en la plataforma
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tipos Revisados</CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reviewedTypes}</div>
          <p className="text-xs text-muted-foreground">
            {((reviewedTypes / totalTypes) * 100).toFixed(0)}% completado
          </p>
        </CardContent>
      </Card>
    </div>
  )
}