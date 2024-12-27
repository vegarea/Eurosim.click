import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderDocumentationFlow: WorkflowItem = {
  id: "FL-104",
  title: "Gestión de documentación UE",
  description: "Sistema de gestión de documentación requerida por la UE",
  status: "working",
  components: [
    "DocumentationForm.tsx",
    "PassportValidator.tsx",
    "DocumentViewer.tsx",
    "DocumentationStep.tsx"
  ],
  database: [
    "customer_documents (tabla)",
    "document_validations (tabla)"
  ],
  details: `
✓ Formulario de documentación implementado
✓ Validación de pasaporte funcionando
✓ Verificación de datos personales
✓ Almacenamiento temporal de documentos
✓ Cumplimiento GDPR implementado
✓ Historial de validaciones
✓ Sistema de exportación de documentos`
}