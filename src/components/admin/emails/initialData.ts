import { EmailTemplate } from "./types"

export const initialTemplates: EmailTemplate[] = [
  {
    id: "payment-confirmation",
    name: "Confirmación de Pago y Preparación",
    subject: "¡Gracias por tu compra! Tu pedido está en preparación",
    status: "processing",
    description: "Email enviado inmediatamente después de confirmar el pago exitoso",
    type: "both",
    variables: ["nombre_cliente", "numero_pedido", "detalles_plan", "total"]
  },
  {
    id: "shipping-confirmation",
    name: "Envío en Camino",
    subject: "¡Tu SIM física está en camino!",
    status: "shipped",
    description: "Notificación cuando la SIM física es enviada, incluye número de seguimiento",
    type: "physical",
    variables: ["nombre_cliente", "numero_pedido", "tracking_number", "courier", "direccion_envio"]
  },
  {
    id: "esim-delivery",
    name: "Entrega de E-SIM",
    subject: "¡Tu E-SIM está lista para activar!",
    status: "delivered",
    description: "Email con los datos de activación de la E-SIM e instrucciones detalladas",
    type: "esim",
    variables: ["nombre_cliente", "numero_pedido", "qr_code", "instrucciones_activacion", "codigo_activacion"]
  },
  {
    id: "physical-delivered",
    name: "SIM Física Entregada",
    subject: "¡Tu SIM física ha sido entregada!",
    status: "delivered",
    description: "Confirmación de entrega exitosa de la SIM física",
    type: "physical",
    variables: ["nombre_cliente", "numero_pedido", "fecha_entrega"]
  },
  {
    id: "order-cancelled",
    name: "Pedido Cancelado",
    subject: "Pedido Cancelado",
    status: "cancelled",
    description: "Notificación de cancelación del pedido y proceso de reembolso si aplica",
    type: "both",
    variables: ["nombre_cliente", "numero_pedido", "motivo_cancelacion", "info_reembolso"]
  }
]