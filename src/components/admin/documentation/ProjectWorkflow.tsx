import { useWorkflows } from "@/hooks/useWorkflows"
import { WorkflowCategory } from "./components/WorkflowCategory"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function ProjectWorkflow() {
  const { data: workflowData, isLoading, error } = useWorkflows()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border space-y-6">
          <Skeleton className="h-4 w-48" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error al cargar los flujos de trabajo. Por favor, intenta recargar la página.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Estado de Implementación</h3>
          <p className="text-sm text-gray-500">
            Seguimiento del estado de implementación de cada funcionalidad del proyecto
          </p>
        </div>

        <div className="space-y-4">
          {workflowData?.map((category) => (
            <WorkflowCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}