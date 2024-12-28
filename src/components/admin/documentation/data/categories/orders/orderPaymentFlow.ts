import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderPaymentFlow: WorkflowItem = {
  id: "FL-103",
  title: "Procesamiento de pagos",
  description: "Integración completa con sistemas de pago",
  status: "reviewed",
  components: [
    "PaymentProcessor.tsx",
    "PaymentMethods.tsx",
    "PaymentConfirmation.tsx",
    "PaymentStatusCard.tsx"
  ],
  database: [
    "payments (tabla)",
    "payment_methods (tabla)",
    "payment_logs (tabla)"
  ],
  details: `
Implementado y revisado:
✓ Interfaz de selección de método de pago
✓ Componentes de procesamiento
✓ Manejo de estados de pago
✓ Visualización de confirmación
✓ Historial de transacciones en UI

Pendiente conexión Supabase:
- Integración con Stripe
- Registro de transacciones en BD
- Manejo de webhooks
- Sistema de reembolsos`
}