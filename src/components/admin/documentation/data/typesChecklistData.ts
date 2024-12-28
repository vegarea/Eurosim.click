import { ChecklistItem } from "../types/ChecklistTypes"

export const typesChecklistData: ChecklistItem[] = [
  {
    id: "orders",
    category: "Pedidos y Transacciones",
    items: [
      {
        name: "Pedidos",
        status: "pending",
        description: "Revisar orders.md y componentes de pedidos",
        currentType: `type Order = {
  id: string
  status: string
  customer: string
  total: number
  type: string
  paymentMethod?: string
}`,
        supabaseType: `type Order = Database["public"]["Tables"]["orders"]["Row"] = {
  id: string
  customer_id: string
  status: Database["public"]["Enums"]["order_status"]
  type: Database["public"]["Enums"]["order_type"]
  total_amount: number
  payment_method: Database["public"]["Enums"]["payment_method"]
  created_at: string
  updated_at: string | null
  shipping_address_id: string | null
  metadata: Json | null
}`
      },
      {
        name: "Items de Pedido",
        status: "pending",
        description: "Verificar order_items.md y relaciones",
        currentType: `type OrderItem = {
  id: string
  quantity: number
  price: number
  productId: string
}`,
        supabaseType: `type OrderItem = Database["public"]["Tables"]["order_items"]["Row"] = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  metadata: Json | null
}`
      }
    ]
  },
  {
    id: "products",
    category: "Productos y Catálogo",
    items: [
      {
        name: "Productos",
        status: "pending",
        description: "Revisar products.md y componentes de productos",
        currentType: `type Product = {
  id: string
  title: string
  price: number
  type: string
}`,
        supabaseType: `type Product = Database["public"]["Tables"]["products"]["Row"] = {
  id: string
  title: string
  description: string | null
  price: number
  type: Database["public"]["Enums"]["product_type"]
  status: Database["public"]["Enums"]["product_status"]
  stock: number | null
  metadata: Json | null
  created_at: string
  updated_at: string | null
}`
      }
    ]
  },
  {
    id: "customers",
    category: "Clientes y Documentación",
    items: [
      {
        name: "Clientes",
        status: "pending",
        description: "Revisar customers.md y gestión de clientes",
        currentType: `type Customer = {
  id: string
  name: string
  email: string
}`,
        supabaseType: `type Customer = Database["public"]["Tables"]["customers"]["Row"] = {
  id: string
  user_id: string
  full_name: string
  email: string
  phone: string | null
  status: Database["public"]["Enums"]["customer_status"]
  metadata: Json | null
  created_at: string
  updated_at: string | null
}`
      },
      {
        name: "Documentos",
        status: "pending",
        description: "Verificar customer_documents.md",
        currentType: `type CustomerDocument = {
  id: string
  customerId: string
  documentType: string
  documentNumber: string
}`,
        supabaseType: `type CustomerDocument = Database["public"]["Tables"]["customer_documents"]["Row"] = {
  id: string
  customer_id: string
  document_type: string
  document_number: string
  created_at: string
  updated_at: string | null
}`
      },
      {
        name: "Validaciones",
        status: "pending",
        description: "Revisar document_validations.md",
        currentType: `type DocumentValidation = {
  id: string
  customerId: string
  isValid: boolean
}`,
        supabaseType: `type DocumentValidation = Database["public"]["Tables"]["document_validations"]["Row"] = {
  id: string
  customer_id: string
  is_valid: boolean
  created_at: string
  updated_at: string | null
}`
      }
    ]
  },
  {
    id: "payments",
    category: "Pagos y Facturación",
    items: [
      {
        name: "Pagos",
        status: "pending",
        description: "Revisar payments.md y procesamiento",
        currentType: `type Payment = {
  id: string
  orderId: string
  amount: number
  method: string
}`,
        supabaseType: `type Payment = Database["public"]["Tables"]["payments"]["Row"] = {
  id: string
  order_id: string
  amount: number
  method: Database["public"]["Enums"]["payment_method"]
  created_at: string
  updated_at: string | null
}`
      },
      {
        name: "Métodos de Pago",
        status: "pending",
        description: "Verificar payment_methods.md",
        currentType: `type PaymentMethod = {
  id: string
  name: string
}`,
        supabaseType: `type PaymentMethod = Database["public"]["Tables"]["payment_methods"]["Row"] = {
  id: string
  name: string
  created_at: string
  updated_at: string | null
}`
      },
      {
        name: "Logs de Pago",
        status: "pending",
        description: "Revisar payment_logs.md",
        currentType: `type PaymentLog = {
  id: string
  paymentId: string
  status: string
}`,
        supabaseType: `type PaymentLog = Database["public"]["Tables"]["payment_logs"]["Row"] = {
  id: string
  payment_id: string
  status: string
  created_at: string
  updated_at: string | null
}`
      }
    ]
  },
  {
    id: "content",
    category: "Contenido y Blog",
    items: [
      {
        name: "Posts",
        status: "pending",
        description: "Revisar blog-posts.md y componentes",
        currentType: `type BlogPost = {
  id: string
  title: string
  content: string
}`,
        supabaseType: `type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"] = {
  id: string
  title: string
  content: string
  created_at: string
  updated_at: string | null
}`
      },
      {
        name: "Imágenes",
        status: "pending",
        description: "Verificar blog-post-images.md",
        currentType: `type BlogPostImage = {
  id: string
  postId: string
  url: string
}`,
        supabaseType: `type BlogPostImage = Database["public"]["Tables"]["blog_post_images"]["Row"] = {
  id: string
  post_id: string
  url: string
  created_at: string
  updated_at: string | null
}`
      }
    ]
  },
  {
    id: "communications",
    category: "Comunicaciones",
    items: [
      {
        name: "Plantillas de Email",
        status: "pending",
        description: "Revisar email-templates.md",
        currentType: `type EmailTemplate = {
  id: string
  subject: string
  body: string
}`,
        supabaseType: `type EmailTemplate = Database["public"]["Tables"]["email_templates"]["Row"] = {
  id: string
  subject: string
  body: string
  created_at: string
  updated_at: string | null
}`
      },
      {
        name: "Logs de Email",
        status: "pending",
        description: "Verificar email_logs.md",
        currentType: `type EmailLog = {
  id: string
  emailId: string
  status: string
}`,
        supabaseType: `type EmailLog = Database["public"]["Tables"]["email_logs"]["Row"] = {
  id: string
  email_id: string
  status: string
  created_at: string
  updated_at: string | null
}`
      }
    ]
  },
  {
    id: "workflows",
    category: "Flujos de Trabajo",
    items: [
      {
        name: "Workflows",
        status: "pending",
        description: "Revisar workflows.md y automatizaciones",
        currentType: `type Workflow = {
  id: string
  title: string
  status: string
}`,
        supabaseType: `type Workflow = Database["public"]["Tables"]["workflows"]["Row"] = {
  id: string
  title: string
  status: string
  created_at: string
  updated_at: string | null
}`
      },
      {
        name: "Categorías",
        status: "pending",
        description: "Verificar workflow_categories.md",
        currentType: `type WorkflowCategory = {
  id: string
  title: string
}`,
        supabaseType: `type WorkflowCategory = Database["public"]["Tables"]["workflow_categories"]["Row"] = {
  id: string
  title: string
  created_at: string
  updated_at: string | null
}`
      },
      {
        name: "Eventos",
        status: "pending",
        description: "Revisar workflow_events.md",
        currentType: `type WorkflowEvent = {
  id: string
  workflowId: string
  type: string
}`,
        supabaseType: `type WorkflowEvent = Database["public"]["Tables"]["workflow_events"]["Row"] = {
  id: string
  workflow_id: string
  type: string
  created_at: string
  updated_at: string | null
}`
      }
    ]
  }
]
