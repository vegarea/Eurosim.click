import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderNotesFlow: WorkflowItem = {
  id: "FL-106",
  title: "Gestión de notas y comentarios",
  description: "Sistema de notas internas y comunicación",
  status: "working",
  components: [
    "OrderNotes.tsx",
    "InternalComments.tsx",
    "NotesTimeline.tsx"
  ],
  database: [
    "order_notes (tabla)",
    "internal_comments (tabla)"
  ],
  details: `
✓ Sistema de notas implementado
✓ Historial de comunicaciones funcionando
✓ Etiquetado de notas
✓ Menciones a usuarios
✓ Adjuntos y archivos
✓ Búsqueda y filtrado
✓ Timeline de comunicaciones`
}