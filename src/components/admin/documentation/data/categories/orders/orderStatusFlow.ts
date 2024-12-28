import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderStatusFlow: WorkflowItem = {
  id: "FL-102",
  title: "Gestión de estados del pedido",
  description: "Sistema de cambios de estado y seguimiento de pedidos",
  status: "reviewed",
  components: [
    "OrderStatusControl.tsx",
    "OrderHistory.tsx",
    "StatusTimeline.tsx",
    "OrderStatusBadge.tsx",
    "OrderStatusConfirmDialog.tsx"
  ],
  database: [
    "orders (tabla)",
    "order_status_history (tabla)",
    "order_events (tabla)"
  ],
  details: `
Implementado y revisado:
✓ Componentes de control de estado
✓ Timeline de eventos
✓ Sistema de badges por estado
✓ Diálogos de confirmación
✓ Validaciones por tipo de pedido
✓ Historial de cambios en UI

Pendiente conexión Supabase:
- Registro de eventos en base de datos
- Historial de cambios en BD
- Notificaciones automáticas
- Políticas RLS para cambios de estado`
}