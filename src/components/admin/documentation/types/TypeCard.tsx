import { Check, AlertTriangle, Code2, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TypeDefinition } from "../types/WorkflowTypes"

interface TypeCardProps {
  type: TypeDefinition
}

export function TypeCard({ type }: TypeCardProps) {
  const getStatusIcon = (status: TypeDefinition["status"]) => {
    switch (status) {
      case "verified":
        return <Check className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Code2 className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: TypeDefinition["status"]) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-green-500">
            Verificado
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="default" className="bg-yellow-500">
            Revisar
          </Badge>
        )
      default:
        return (
          <Badge variant="default" className="bg-blue-500">
            Pendiente
          </Badge>
        )
    }
  }

  return (
    <Card key={type.name} className="border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(type.status)}
            <CardTitle className="text-lg">{type.name}</CardTitle>
          </div>
          {getStatusBadge(type.status)}
        </div>
        <CardDescription>{type.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <div className="space-y-4">
            {type.fields.map((field) => (
              <div key={field.name} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-mono text-sm">
                    {field.name}: <span className="text-blue-600">{field.type}</span>
                    {field.supabaseField && field.supabaseField !== field.name && (
                      <span className="text-gray-500 ml-2">
                        → {field.supabaseField}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {field.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}