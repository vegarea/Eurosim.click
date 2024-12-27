import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderNotesFlow: WorkflowItem = {
  id: "FL-107",
  title: "Gestión de notas y comentarios",
  description: "Sistema de notas internas y comunicación",
  status: "working",
  components: [
    "OrderNotes.tsx",
    "InternalComments.tsx"
  ],
  database: [
    "order_notes (tabla)",
    "internal_comments (tabla)"
  ],
  details: `
- Notas internas
- Historial de comunicaciones
- Etiquetado de notas
- Menciones a usuarios
- Adjuntos y archivos
- Búsqueda y filtrado`
}