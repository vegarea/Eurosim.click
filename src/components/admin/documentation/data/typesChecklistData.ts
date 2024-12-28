type ChecklistItemStatus = "pending" | "in_progress" | "completed" | "reviewed"

interface ChecklistItem {
  id: string
  category: string
  items: Array<{
    name: string
    status: ChecklistItemStatus
    description: string
  }>
}

export const typesChecklistData: ChecklistItem[] = [
  {
    id: "auth",
    category: "Autenticación y Usuarios",
    items: [
      {
        name: "Perfiles de Usuario",
        status: "pending" as const,
        description: "Revisar tipos en profiles.md y componentes de autenticación"
      },
      {
        name: "Roles y Permisos",
        status: "pending" as const,
        description: "Verificar role_permissions.md y políticas RLS"
      },
      {
        name: "Logs de Autenticación",
        status: "pending" as const,
        description: "Revisar auth_logs.md y eventos de autenticación"
      }
    ]
  },
  {
    id: "orders",
    category: "Pedidos y Transacciones",
    items: [
      {
        name: "Pedidos",
        status: "pending" as const,
        description: "Revisar orders.md y componentes de pedidos"
      },
      {
        name: "Items de Pedido",
        status: "pending" as const,
        description: "Verificar order_items.md y relaciones"
      },
      {
        name: "Historial de Estados",
        status: "pending" as const,
        description: "Revisar order_status_history.md"
      },
      {
        name: "Eventos de Pedido",
        status: "pending" as const,
        description: "Verificar order_events.md y triggers"
      },
      {
        name: "Notas de Pedido",
        status: "pending" as const,
        description: "Revisar order_notes.md y componentes"
      }
    ]
  },
  {
    id: "products",
    category: "Productos y Catálogo",
    items: [
      {
        name: "Productos",
        status: "pending" as const,
        description: "Revisar products.md y componentes de productos"
      },
      {
        name: "Categorías",
        status: "pending" as const,
        description: "Verificar categorización y filtros"
      }
    ]
  },
  {
    id: "customers",
    category: "Clientes y Documentación",
    items: [
      {
        name: "Clientes",
        status: "pending" as const,
        description: "Revisar customers.md y gestión de clientes"
      },
      {
        name: "Documentos",
        status: "pending" as const,
        description: "Verificar customer_documents.md"
      },
      {
        name: "Validaciones",
        status: "pending" as const,
        description: "Revisar document_validations.md"
      }
    ]
  },
  {
    id: "payments",
    category: "Pagos y Facturación",
    items: [
      {
        name: "Pagos",
        status: "pending" as const,
        description: "Revisar payments.md y procesamiento"
      },
      {
        name: "Métodos de Pago",
        status: "pending" as const,
        description: "Verificar payment_methods.md"
      },
      {
        name: "Logs de Pago",
        status: "pending" as const,
        description: "Revisar payment_logs.md"
      }
    ]
  },
  {
    id: "content",
    category: "Contenido y Blog",
    items: [
      {
        name: "Posts",
        status: "pending" as const,
        description: "Revisar blog-posts.md y componentes"
      },
      {
        name: "Imágenes",
        status: "pending" as const,
        description: "Verificar blog-post-images.md"
      }
    ]
  },
  {
    id: "communications",
    category: "Comunicaciones",
    items: [
      {
        name: "Plantillas de Email",
        status: "pending" as const,
        description: "Revisar email-templates.md"
      },
      {
        name: "Logs de Email",
        status: "pending" as const,
        description: "Verificar email_logs.md"
      }
    ]
  },
  {
    id: "workflows",
    category: "Flujos de Trabajo",
    items: [
      {
        name: "Workflows",
        status: "pending" as const,
        description: "Revisar workflows.md y automatizaciones"
      },
      {
        name: "Categorías",
        status: "pending" as const,
        description: "Verificar workflow_categories.md"
      },
      {
        name: "Eventos",
        status: "pending" as const,
        description: "Revisar workflow_events.md"
      }
    ]
  }
]
