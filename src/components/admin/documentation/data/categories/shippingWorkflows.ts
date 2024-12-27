import { WorkflowItem } from "../../types/WorkflowTypes"

export const shippingWorkflows: WorkflowItem[] = [
  {
    id: "FL-301",
    title: "Envío de SIMs físicas",
    description: "Gestión de envíos físicos y tracking",
    status: "working",
    components: [
      "ShippingForm.tsx",
      "TrackingSystem.tsx"
    ],
    database: [
      "shipments (tabla)",
      "tracking_events (tabla)"
    ]
  },
  {
    id: "FL-302",
    title: "Entrega de eSIMs",
    description: "Sistema de entrega digital de eSIMs",
    status: "pending",
    components: [
      "ESimDelivery.tsx",
      "QRCodeGenerator.tsx"
    ],
    database: [
      "esim_deliveries (tabla)"
    ]
  }
]