import { EmailTemplate } from "./types"

export const initialTemplates: EmailTemplate[] = [
  {
    id: "payment-confirmation",
    name: "Confirmación de Pago y Preparación",
    subject: "¡Gracias por tu compra! Tu pedido está en preparación",
    status: "processing",
    description: "Email enviado inmediatamente después de confirmar el pago exitoso",
    type: "both",
    variables: ["nombre_cliente", "numero_pedido", "detalles_plan", "total"],
    content: `
      <h2>¡Hola {nombre_cliente}!</h2>
      <p>¡Gracias por tu compra! Hemos recibido tu pedido #{numero_pedido} y está siendo procesado.</p>
      <h3>Detalles de tu pedido:</h3>
      <p>{detalles_plan}</p>
      <p>Total: {total}</p>
      <p>Te mantendremos informado sobre el estado de tu pedido.</p>
      <p>¡Gracias por confiar en nosotros!</p>
    `
  },
  {
    id: "shipping-confirmation",
    name: "Envío en Camino",
    subject: "¡Tu SIM física está en camino!",
    status: "shipped",
    description: "Notificación cuando la SIM física es enviada, incluye número de seguimiento",
    type: "physical",
    variables: ["nombre_cliente", "numero_pedido", "tracking_number", "courier", "direccion_envio"],
    content: `
      <h2>¡Hola {nombre_cliente}!</h2>
      <p>¡Buenas noticias! Tu SIM física del pedido #{numero_pedido} está en camino.</p>
      <h3>Detalles del envío:</h3>
      <p>Número de seguimiento: {tracking_number}</p>
      <p>Empresa de mensajería: {courier}</p>
      <p>Dirección de entrega: {direccion_envio}</p>
      <p>Puedes hacer seguimiento de tu envío con el número proporcionado.</p>
    `
  },
  {
    id: "esim-delivery",
    name: "Entrega de E-SIM",
    subject: "¡Tu E-SIM está lista para activar!",
    status: "delivered",
    description: "Email con los datos de activación de la E-SIM e instrucciones detalladas",
    type: "esim",
    variables: ["nombre_cliente", "numero_pedido", "qr_code", "instrucciones_activacion", "codigo_activacion"],
    content: `
      <h2>¡Hola {nombre_cliente}!</h2>
      <p>¡Tu E-SIM está lista para ser activada!</p>
      <h3>Instrucciones de activación:</h3>
      <p>{instrucciones_activacion}</p>
      <p>Código de activación: {codigo_activacion}</p>
      <div>{qr_code}</div>
      <p>Si tienes alguna duda, no dudes en contactarnos.</p>
    `
  },
  {
    id: "physical-delivered",
    name: "SIM Física Entregada",
    subject: "¡Tu SIM física ha sido entregada!",
    status: "delivered",
    description: "Confirmación de entrega exitosa de la SIM física",
    type: "physical",
    variables: ["nombre_cliente", "numero_pedido", "fecha_entrega"],
    content: `
      <h2>¡Hola {nombre_cliente}!</h2>
      <p>Tu SIM física del pedido #{numero_pedido} ha sido entregada exitosamente el {fecha_entrega}.</p>
      <p>¡Esperamos que disfrutes de nuestro servicio!</p>
      <p>Si tienes alguna pregunta sobre la activación o el uso de tu SIM, no dudes en contactarnos.</p>
    `
  },
  {
    id: "order-cancelled",
    name: "Pedido Cancelado",
    subject: "Pedido Cancelado",
    status: "cancelled",
    description: "Notificación de cancelación del pedido y proceso de reembolso si aplica",
    type: "both",
    variables: ["nombre_cliente", "numero_pedido", "motivo_cancelacion", "info_reembolso"],
    content: `
      <h2>¡Hola {nombre_cliente}!</h2>
      <p>Tu pedido #{numero_pedido} ha sido cancelado.</p>
      <h3>Motivo de la cancelación:</h3>
      <p>{motivo_cancelacion}</p>
      <h3>Información sobre el reembolso:</h3>
      <p>{info_reembolso}</p>
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
    `
  }
]