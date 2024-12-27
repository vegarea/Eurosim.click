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
✓ Selección de productos implementada
✓ Validación de stock implementada
✓ Cálculo de totales funcionando
✓ Aplicación de descuentos implementada
✓ Validación de datos del cliente
✓ Integración con contexto de carrito
✓ Gestión de estado del pedido
✓ Rutas y navegación configuradas`
}