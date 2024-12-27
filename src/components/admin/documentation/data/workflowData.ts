import { WorkflowCategory } from "../types/WorkflowTypes"

export const workflowData: WorkflowCategory[] = [
  {
    id: "config",
    title: "Configuración",
    items: [
      {
        id: "FL-001",
        title: "Subida y actualización de logo",
        description: "Permite subir y actualizar el logo de la empresa que se muestra en el sitio",
        status: "pending",
        details: "El logo debe poder actualizarse en tiempo real sin necesidad de refrescar la página. Se debe validar el tamaño y formato de la imagen.",
        components: [
          "LogoUploader.tsx",
          "Header.tsx",
          "AdminSettings.tsx"
        ],
        database: [
          "settings (tabla)",
          "files (bucket de Supabase)"
        ]
      },
      {
        id: "FL-002",
        title: "Configuración de redes sociales",
        description: "Enlaces a redes sociales y WhatsApp",
        status: "working",
        details: "Los enlaces se guardan correctamente en la base de datos",
        components: [
          "SocialLinks.tsx",
          "Footer.tsx"
        ],
        database: [
          "settings (tabla)"
        ]
      }
    ]
  },
  {
    id: "orders",
    title: "Pedidos",
    items: [
      {
        id: "FL-101",
        title: "Proceso de pago con Stripe",
        description: "Flujo completo de pago usando Stripe",
        status: "working",
        details: "Integración con Stripe, manejo de webhooks y actualización de estado del pedido",
        components: [
          "PaymentForm.tsx",
          "OrderSummary.tsx"
        ],
        database: [
          "orders (tabla)",
          "payments (tabla)"
        ]
      },
      {
        id: "FL-102",
        title: "Envío de confirmación por email",
        description: "Email automático después de la compra",
        status: "pending",
        details: "Pendiente integración con servicio de email",
        components: [
          "EmailService.ts",
          "OrderConfirmationEmail.tsx"
        ],
        database: [
          "orders (tabla)",
          "email_queue (tabla)"
        ]
      }
    ]
  },
  {
    id: "products",
    title: "Productos",
    items: [
      {
        id: "FL-201",
        title: "Gestión de inventario",
        description: "Control de stock de SIMs físicas",
        status: "working",
        details: "Actualización automática del stock al procesar pedidos",
        components: [
          "InventoryManager.tsx",
          "ProductList.tsx"
        ],
        database: [
          "products (tabla)",
          "inventory (tabla)"
        ]
      },
      {
        id: "FL-202",
        title: "Activación de eSIMs",
        description: "Proceso automático de activación",
        status: "pending",
        details: "Pendiente integración con API del proveedor",
        components: [
          "ESimActivator.tsx",
          "ActivationStatus.tsx"
        ],
        database: [
          "esims (tabla)",
          "activation_logs (tabla)"
        ]
      }
    ]
  }
]
