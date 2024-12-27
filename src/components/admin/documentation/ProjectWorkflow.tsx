import { workflowData } from "./data/workflowData"
import { WorkflowCategory } from "./components/WorkflowCategory"

export function ProjectWorkflow() {
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
          {workflowData.map((category) => (
            <WorkflowCategory key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}