import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderStatusFlow: WorkflowItem = {
  id: "FL-102",
  title: "Gestión de estados del pedido",
  description: "Sistema de cambios de estado y seguimiento de pedidos",
  status: "pending",
  components: [
    "OrderStatusControl.tsx",
    "OrderHistory.tsx",
    "StatusTimeline.tsx"
  ],
  database: [
    "orders (tabla)",
    "order_status_history (tabla)",
    "order_events (tabla)"
  ],
  details: `
- Cambios de estado manual y automático
- Validaciones por tipo de pedido
- Historial de cambios
- Notificaciones automáticas
- Timeline de eventos
- Reglas de transición de estados`
}