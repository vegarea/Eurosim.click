import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReactNode } from "react"

interface TypeComparisonProps {
  title: string
  icon?: ReactNode
  currentType: string
  supabaseType: string
  status?: "pending" | "reviewed" | "completed"
  relatedFiles?: string[]
}

export function TypeComparisonSection({ 
  title, 
  icon,
  currentType, 
  supabaseType,
  status = "pending",
  relatedFiles = []
}: TypeComparisonProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "reviewed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "reviewed":
        return "Verificado"
      default:
        return "Pendiente"
    }
  }

  return (
    <Card className={status === "reviewed" ? "border-green-200" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={`${getStatusColor(status)} px-3 py-1`}
          >
            {getStatusText(status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Tipos Actuales</h3>
            <pre className="bg-slate-50 p-4 rounded-md overflow-x-auto">
              <code>{currentType}</code>
            </pre>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Tipos Supabase</h3>
            <pre className="bg-slate-50 p-4 rounded-md overflow-x-auto">
              <code>{supabaseType}</code>
            </pre>
          </div>
        </div>
        {relatedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Archivos Relacionados</h3>
            <ul className="list-disc pl-5 space-y-1">
              {relatedFiles.map((file, index) => (
                <li key={index} className="text-sm text-gray-600">{file}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}