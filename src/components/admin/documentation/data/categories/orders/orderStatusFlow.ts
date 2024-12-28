import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderStatusFlow: WorkflowItem = {
  id: "FL-102",
  title: "Gestión de estados del pedido",
  description: "Sistema de cambios de estado y seguimiento de pedidos",
  status: "working",
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
✓ Componentes de control de estado implementados
✓ Timeline de eventos implementado
✓ Sistema de badges por estado implementado
✓ Diálogos de confirmación implementados
✓ Validaciones por tipo de pedido implementadas
✓ Historial de cambios en UI implementado
✓ Registro de eventos en base de datos implementado
✓ Historial de cambios en BD implementado
✓ Notificaciones automáticas configuradas
✓ Políticas RLS para cambios de estado configuradas`
}