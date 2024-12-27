import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderDocumentationFlow: WorkflowItem = {
  id: "FL-104",
  title: "Gestión de documentación UE",
  description: "Sistema de gestión de documentación requerida por la UE",
  status: "pending",
  components: [
    "DocumentationForm.tsx",
    "PassportValidator.tsx",
    "DocumentViewer.tsx"
  ],
  database: [
    "customer_documents (tabla)",
    "document_validations (tabla)"
  ],
  details: `
- Validación de pasaporte
- Verificación de datos personales
- Almacenamiento seguro de documentos
- Cumplimiento GDPR
- Historial de validaciones
- Exportación de documentación`
}