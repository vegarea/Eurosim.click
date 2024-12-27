import { WorkflowCategory } from "../types/WorkflowTypes"

export const workflowData: WorkflowCategory[] = [
  {
    id: "auth",
    title: "Autenticación y Usuarios",
    items: [
      {
        id: "FL-001",
        title: "Registro de usuario",
        description: "Proceso de registro de nuevos usuarios en la plataforma",
        status: "pending",
        components: [
          "RegisterForm.tsx",
          "AuthContext.tsx"
        ],
        database: [
          "users (tabla)",
          "profiles (tabla)"
        ],
        details: "Pendiente implementar validación de email y proceso de verificación"
      },
      {
        id: "FL-002",
        title: "Inicio de sesión",
        description: "Sistema de autenticación de usuarios",
        status: "pending",
        components: [
          "LoginForm.tsx",
          "AuthContext.tsx"
        ],
        database: [
          "users (tabla)",
          "sessions (tabla)"
        ]
      }
    ]
  },
  {
    id: "orders",
    title: "Gestión de Pedidos",
    items: [
      {
        id: "FL-101",
        title: "Creación de pedido",
        description: "Proceso de creación y validación de nuevos pedidos",
        status: "working",
        components: [
          "Checkout.tsx",
          "CartContext.tsx",
          "OrdersContext.tsx"
        ],
        database: [
          "orders (tabla)",
          "order_items (tabla)"
        ],
        details: "El proceso de creación de pedidos está funcionando correctamente"
      },
      {
        id: "FL-102",
        title: "Procesamiento de pago",
        description: "Integración con pasarelas de pago",
        status: "working",
        components: [
          "PaymentStep.tsx",
          "StripeIntegration.tsx"
        ],
        database: [
          "payments (tabla)",
          "payment_methods (tabla)"
        ]
      },
      {
        id: "FL-103",
        title: "Seguimiento de pedido",
        description: "Sistema de tracking y actualización de estado",
        status: "pending",
        components: [
          "OrderTracking.tsx",
          "OrderStatus.tsx"
        ],
        database: [
          "order_status (tabla)",
          "tracking_updates (tabla)"
        ]
      }
    ]
  },
  {
    id: "products",
    title: "Gestión de Productos",
    items: [
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
  },
  {
    id: "shipping",
    title: "Envíos",
    items: [
      {
        id: "FL-301",
        title: "Envío de SIMs físicas",
        description: "Gestión de envíos físicos y tracking",
        status: "working",
        components: [
          "ShippingForm.tsx",
          "TrackingSystem.tsx"
        ],
        database: [
          "shipments (tabla)",
          "tracking_events (tabla)"
        ]
      },
      {
        id: "FL-302",
        title: "Entrega de eSIMs",
        description: "Sistema de entrega digital de eSIMs",
        status: "pending",
        components: [
          "ESimDelivery.tsx",
          "QRCodeGenerator.tsx"
        ],
        database: [
          "esim_deliveries (tabla)"
        ]
      }
    ]
  },
  {
    id: "blog",
    title: "Blog y Contenido",
    items: [
      {
        id: "FL-401",
        title: "Gestión de artículos",
        description: "CRUD de artículos del blog",
        status: "pending",
        components: [
          "BlogEditor.tsx",
          "ArticleList.tsx"
        ],
        database: [
          "blog_posts (tabla)",
          "blog_categories (tabla)"
        ]
      },
      {
        id: "FL-402",
        title: "Generación automática de contenido",
        description: "Sistema de generación de contenido con IA",
        status: "pending",
        components: [
          "ContentGenerator.tsx",
          "AIIntegration.tsx"
        ],
        database: [
          "ai_generated_content (tabla)"
        ]
      }
    ]
  },
  {
    id: "emails",
    title: "Sistema de Emails",
    items: [
      {
        id: "FL-501",
        title: "Plantillas de email",
        description: "Gestión de plantillas para diferentes tipos de emails",
        status: "working",
        components: [
          "EmailTemplateEditor.tsx",
          "EmailPreview.tsx"
        ],
        database: [
          "email_templates (tabla)"
        ]
      },
      {
        id: "FL-502",
        title: "Envío automático de emails",
        description: "Sistema de envío automático basado en eventos",
        status: "pending",
        components: [
          "EmailService.ts",
          "EmailQueue.tsx"
        ],
        database: [
          "email_queue (tabla)",
          "email_logs (tabla)"
        ]
      }
    ]
  },
  {
    id: "settings",
    title: "Configuración del Sistema",
    items: [
      {
        id: "FL-601",
        title: "Configuración de marca",
        description: "Gestión de logos, colores y elementos de marca",
        status: "pending",
        components: [
          "BrandSettings.tsx",
          "StyleSettings.tsx"
        ],
        database: [
          "settings (tabla)",
          "brand_assets (tabla)"
        ]
      },
      {
        id: "FL-602",
        title: "Integraciones",
        description: "Gestión de integraciones con servicios externos",
        status: "working",
        components: [
          "IntegrationsManager.tsx",
          "APIKeys.tsx"
        ],
        database: [
          "integrations (tabla)",
          "api_keys (tabla)"
        ]
      }
    ]
  }
]