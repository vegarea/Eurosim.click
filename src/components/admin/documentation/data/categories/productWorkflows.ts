import { WorkflowItem } from "../../types/WorkflowTypes"

export const productWorkflows: WorkflowItem[] = [
  {
    id: "FL-201",
    title: "Gestión de SIMs físicas",
    description: "CRUD de SIMs físicas y control de inventario",
    status: "working",
    components: [
      "ProductCard.tsx",
      "ProductList.tsx",
      "InventoryManager.tsx"
    ],
    database: [
      "products (tabla)",
      "inventory (tabla)"
    ]
  },
  {
    id: "FL-202",
    title: "Gestión de eSIMs",
    description: "Sistema de activación y entrega de eSIMs",
    status: "pending",
    components: [
      "ESimManager.tsx",
      "ESimActivation.tsx"
    ],
    database: [
      "esims (tabla)",
      "esim_activations (tabla)"
    ]
  }
]