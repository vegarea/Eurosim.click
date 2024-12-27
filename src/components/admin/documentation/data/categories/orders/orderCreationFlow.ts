import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderCreationFlow: WorkflowItem = {
  id: "FL-101",
  title: "Creación de pedido",
  description: "Proceso completo de creación y validación de nuevos pedidos",
  status: "working",
  components: [
    "Checkout.tsx",
    "CartContext.tsx",
    "OrdersContext.tsx",
    "PaymentStep.tsx"
  ],
  database: [
    "orders (tabla)",
    "order_items (tabla)"
  ],
  details: `
- Selección de productos
- Validación de stock
- Cálculo de totales
- Aplicación de descuentos
- Validación de datos del cliente
- Integración con pasarelas de pago`
}