import { WorkflowItem } from "../../types/WorkflowTypes"

export const shippingWorkflows: WorkflowItem[] = [
  {
    id: "FL-301",
    title: "Gestión de envíos físicos",
    description: "Sistema de gestión de envíos de SIMs físicas",
    status: "working",
    components: [
      "AdminPhysicalShipping.tsx",
      "ShippingConfirmDialog.tsx",
      "ShippingTabs.tsx"
    ],
    database: [
      "orders (tabla) - campos shipping_address, tracking_number, carrier"
    ],
    details: `
✓ Confirmación de envío con número de tracking implementada
✓ Selección de empresa de mensajería funcionando
✓ Seguimiento del estado del envío
✓ Marcado automático como entregado
✓ Envío de emails de confirmación
✓ UI completa y responsive`
  },
  {
    id: "FL-302",
    title: "Gestión de entrega eSIMs",
    description: "Proceso de entrega manual de eSIMs usando plataforma externa",
    status: "working",
    components: [
      "AdminESimDelivery.tsx",
      "OrderStatusControl.tsx"
    ],
    database: [
      "orders (tabla) - campos type, status"
    ],
    details: `
✓ Listado de eSIMs pendientes implementado
✓ Sistema de entrega manual funcionando
✓ Marcado de estado como entregado
✓ Envío de email de confirmación
✓ Registro en historial de la orden
✓ UI completa y funcional`
  },
  {
    id: "FL-303",
    title: "Notificaciones de envío",
    description: "Sistema de notificaciones automáticas para envíos",
    status: "working",
    components: [
      "OrderStatusConfirmDialog.tsx",
      "EmailTemplates.tsx"
    ],
    database: [
      "email_templates (tabla)",
      "orders (tabla) - campos status, tracking_number",
      "email_logs (tabla)"
    ],
    details: `
✓ UI de plantillas de email implementada
✓ Sistema de notificaciones diseñado
✓ Componentes de confirmación implementados
✓ Integración con Supabase completada:
  - Políticas RLS configuradas
  - Triggers para cambios de estado
  - Registro de emails enviados
  - Plantillas de email persistidas
✓ Sistema completo y funcional`
  },
  {
    id: "FL-304",
    title: "Seguimiento de envíos",
    description: "Sistema de tracking y actualizaciones de estado",
    status: "working",
    components: [
      "ShippingTabs.tsx",
      "OrderStatusBadge.tsx"
    ],
    database: [
      "orders (tabla) - campos status, tracking_number, carrier"
    ],
    details: `
✓ Visualización de estado de envíos implementada
✓ Sistema de tracking por transportista funcionando
✓ Actualización manual de estados
✓ Historial de cambios de estado
✓ UI completa y responsive`
  }
]