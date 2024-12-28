import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderPaymentFlow: WorkflowItem = {
  id: "FL-103",
  title: "Procesamiento de pagos",
  description: "Integración completa con sistemas de pago",
  status: "working",
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
✓ Interfaz de selección de método de pago implementada
✓ Componentes de procesamiento implementados
✓ Manejo de estados de pago implementado
✓ Visualización de confirmación implementada
✓ Historial de transacciones en UI implementado
✓ Integración con Stripe configurada
✓ Registro de transacciones en BD implementado
✓ Manejo de webhooks configurado
✓ Sistema de reembolsos implementado`
}