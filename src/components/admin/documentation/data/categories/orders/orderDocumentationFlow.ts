import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderDocumentationFlow: WorkflowItem = {
  id: "FL-104",
  title: "Documentación UE",
  description: "Sistema de validación de documentación para regulación UE",
  status: "working",
  components: [
    "DocumentationForm.tsx",
    "DocumentPreview.tsx",
    "ValidationStatus.tsx"
  ],
  database: [
    "customer_documents (tabla)",
    "document_validations (tabla)"
  ],
  details: `
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ Triggers configurados
✓ Formularios implementados
✓ Sistema de validación diseñado

Pendiente integración:
- Sistema de validación automática
- Notificaciones de estado
- Almacenamiento de documentos`
}