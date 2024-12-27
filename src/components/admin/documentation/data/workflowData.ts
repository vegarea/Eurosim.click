import { WorkflowCategory } from "../types/WorkflowTypes"

export const workflowData: WorkflowCategory[] = [
  {
    id: "config",
    title: "Configuración",
    items: [
      {
        id: "CONF-001",
        title: "Subida y actualización de logo",
        description: "Permite subir y actualizar el logo de la empresa que se muestra en el sitio",
        status: "pending",
        details: "Implementar almacenamiento y actualización en tiempo real del logo en el header"
      },
      {
        id: "CONF-002",
        title: "Configuración de redes sociales",
        description: "Enlaces a redes sociales y WhatsApp",
        status: "working",
        details: "Los enlaces se guardan correctamente en la base de datos"
      }
    ]
  },
  {
    id: "orders",
    title: "Pedidos",
    items: [
      {
        id: "ORD-001",
        title: "Proceso de pago con Stripe",
        description: "Flujo completo de pago usando Stripe",
        status: "working",
        details: "Integración con Stripe, manejo de webhooks y actualización de estado del pedido"
      },
      {
        id: "ORD-002",
        title: "Envío de confirmación por email",
        description: "Email automático después de la compra",
        status: "pending",
        details: "Pendiente integración con servicio de email"
      }
    ]
  },
  {
    id: "products",
    title: "Productos",
    items: [
      {
        id: "PROD-001",
        title: "Gestión de inventario",
        description: "Control de stock de SIMs físicas",
        status: "working",
        details: "Actualización automática del stock al procesar pedidos"
      },
      {
        id: "PROD-002",
        title: "Activación de eSIMs",
        description: "Proceso automático de activación",
        status: "pending",
        details: "Pendiente integración con API del proveedor"
      }
    ]
  }
]