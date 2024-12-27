import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderPaymentFlow: WorkflowItem = {
  id: "FL-103",
  title: "Procesamiento de pagos",
  description: "Integración completa con sistemas de pago",
  status: "pending",
  components: [
    "PaymentProcessor.tsx",
    "PaymentMethods.tsx",
    "PaymentConfirmation.tsx"
  ],
  database: [
    "payments (tabla)",
    "payment_methods (tabla)",
    "payment_logs (tabla)"
  ],
  details: `
- Integración con Stripe
- Integración con PayPal
- Manejo de reembolsos
- Pagos parciales
- Historial de transacciones
- Facturación automática`
}