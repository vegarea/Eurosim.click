import { WorkflowItem } from "../../types/WorkflowTypes"

export const validationWorkflows: WorkflowItem[] = [
  {
    id: "FL-901",
    title: "Validación de Tipos TypeScript",
    description: "Validación de la correspondencia entre tipos de base de datos y TypeScript",
    status: "working",
    components: [
      "components/admin/documentation/components/TypeValidation.tsx",
      "components/admin/documentation/utils/typeValidation.ts"
    ],
    database: [
      "Todas las tablas del esquema público"
    ],
    details: `
✓ Validación automática de tipos TypeScript vs tipos de BD
✓ Detección de discrepancias en tipos
✓ Visualización de errores de mapeo
✓ Sugerencias de corrección
✓ Sistema de alertas por inconsistencias`
  },
  {
    id: "FL-902",
    title: "Validación de Documentación",
    description: "Verificación de la documentación contra la implementación real",
    status: "working",
    components: [
      "components/admin/documentation/DatabaseStructure.tsx",
      "components/admin/documentation/components/TableCard.tsx"
    ],
    database: [
      "Todas las tablas documentadas en /docs/database/"
    ],
    details: `
✓ Verificación de estructura documentada vs real
✓ Validación de relaciones y constraints
✓ Comprobación de políticas RLS
✓ Validación de índices y triggers
✓ Sistema de alertas por inconsistencias`
  },
  {
    id: "FL-903",
    title: "Validación de Flujos de Trabajo",
    description: "Verificación de la implementación de flujos documentados",
    status: "working",
    components: [
      "components/admin/documentation/ProjectWorkflow.tsx",
      "components/admin/documentation/WorkflowCategory.tsx"
    ],
    details: `
✓ Verificación de estados de implementación
✓ Validación de dependencias entre flujos
✓ Comprobación de componentes requeridos
✓ Validación de integraciones necesarias
✓ Sistema de alertas por dependencias faltantes`
  }
]