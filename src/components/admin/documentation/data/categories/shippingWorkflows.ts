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
- Confirmación de envío con número de tracking
- Selección de empresa de mensajería
- Seguimiento del estado del envío
- Marcado automático como entregado
- Envío de emails de confirmación al cliente`
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
- Listado de eSIMs pendientes de entrega
- Manager genera y envía eSIM desde plataforma externa
- Marcado manual como entregado una vez enviado
- Envío de email de confirmación al cliente
- Registro en historial de la orden`
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
      "orders (tabla) - campos status, tracking_number"
    ],
    details: `
- Plantillas de email para cada estado de envío
- Notificación automática al confirmar envío físico
- Notificación al marcar eSIM como entregada
- Inclusión de detalles de tracking en emails`
  }
]