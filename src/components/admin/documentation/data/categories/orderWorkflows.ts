import { WorkflowItem } from "../../types/WorkflowTypes"

export const orderWorkflows: WorkflowItem[] = [
  {
    id: "FL-101",
    title: "Creación de pedido",
    description: "Proceso de creación y validación de nuevos pedidos",
    status: "working",
    components: [
      "Checkout.tsx",
      "CartContext.tsx",
      "OrdersContext.tsx"
    ],
    database: [
      "orders (tabla)",
      "order_items (tabla)"
    ],
    details: "El proceso de creación de pedidos está funcionando correctamente"
  },
  {
    id: "FL-102",
    title: "Procesamiento de pago",
    description: "Integración con pasarelas de pago",
    status: "working",
    components: [
      "PaymentStep.tsx",
      "StripeIntegration.tsx"
    ],
    database: [
      "payments (tabla)",
      "payment_methods (tabla)"
    ]
  },
  {
    id: "FL-103",
    title: "Seguimiento de pedido",
    description: "Sistema de tracking y actualización de estado",
    status: "pending",
    components: [
      "OrderTracking.tsx",
      "OrderStatus.tsx"
    ],
    database: [
      "order_status (tabla)",
      "tracking_updates (tabla)"
    ]
  }
]