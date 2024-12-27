import { WorkflowItem } from "../../types/WorkflowTypes"

export const orderWorkflows: WorkflowItem[] = [
  {
    id: "FL-101",
    title: "Creación de pedido",
    description: "Proceso completo de creación y validación de nuevos pedidos",
    status: "working",
    components: [
      "Checkout.tsx",
      "CartContext.tsx",
      "OrdersContext.tsx",
      "PaymentStep.tsx"
    ],
    database: [
      "orders (tabla)",
      "order_items (tabla)"
    ],
    details: `
- Selección de productos
- Validación de stock
- Cálculo de totales
- Aplicación de descuentos
- Validación de datos del cliente
- Integración con pasarelas de pago`
  },
  {
    id: "FL-102",
    title: "Gestión de estados del pedido",
    description: "Sistema de cambios de estado y seguimiento de pedidos",
    status: "pending",
    components: [
      "OrderStatusControl.tsx",
      "OrderHistory.tsx",
      "StatusTimeline.tsx"
    ],
    database: [
      "orders (tabla)",
      "order_status_history (tabla)",
      "order_events (tabla)"
    ],
    details: `
- Cambios de estado manual y automático
- Validaciones por tipo de pedido
- Historial de cambios
- Notificaciones automáticas
- Timeline de eventos
- Reglas de transición de estados`
  },
  {
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
  },
  {
    id: "FL-104",
    title: "Gestión de documentación UE",
    description: "Sistema de gestión de documentación requerida por la UE",
    status: "pending",
    components: [
      "DocumentationForm.tsx",
      "PassportValidator.tsx",
      "DocumentViewer.tsx"
    ],
    database: [
      "customer_documents (tabla)",
      "document_validations (tabla)"
    ],
    details: `
- Validación de pasaporte
- Verificación de datos personales
- Almacenamiento seguro de documentos
- Cumplimiento GDPR
- Historial de validaciones
- Exportación de documentación`
  },
  {
    id: "FL-105",
    title: "Notificaciones de pedidos",
    description: "Sistema integral de notificaciones para pedidos",
    status: "pending",
    components: [
      "OrderNotifications.tsx",
      "EmailTemplates.tsx",
      "NotificationPreferences.tsx"
    ],
    database: [
      "notifications (tabla)",
      "notification_templates (tabla)",
      "notification_logs (tabla)"
    ],
    details: `
- Notificaciones por email
- Notificaciones SMS
- Plantillas personalizables
- Programación de recordatorios
- Preferencias de notificación
- Historial de comunicaciones`
  },
  {
    id: "FL-106",
    title: "Reportes y análisis de pedidos",
    description: "Sistema de reportes y análisis de ventas",
    status: "pending",
    components: [
      "OrderAnalytics.tsx",
      "SalesReports.tsx",
      "RevenueCharts.tsx"
    ],
    database: [
      "order_analytics (tabla)",
      "sales_reports (tabla)"
    ],
    details: `
- Dashboard de ventas
- Reportes personalizables
- Análisis de tendencias
- Exportación de datos
- Métricas clave (KPIs)
- Segmentación de datos`
  },
  {
    id: "FL-107",
    title: "Gestión de notas y comentarios",
    description: "Sistema de notas internas y comunicación",
    status: "working",
    components: [
      "OrderNotes.tsx",
      "InternalComments.tsx",
      "CustomerCommunication.tsx"
    ],
    database: [
      "order_notes (tabla)",
      "internal_comments (tabla)"
    ],
    details: `
- Notas internas
- Historial de comunicaciones
- Etiquetado de notas
- Menciones a usuarios
- Adjuntos y archivos
- Búsqueda y filtrado`
  },
  {
    id: "FL-108",
    title: "Gestión de devoluciones",
    description: "Sistema de gestión de devoluciones y reembolsos",
    status: "pending",
    components: [
      "ReturnManager.tsx",
      "RefundProcessor.tsx",
      "ReturnPolicy.tsx"
    ],
    database: [
      "returns (tabla)",
      "refunds (tabla)",
      "return_reasons (tabla)"
    ],
    details: `
- Solicitud de devolución
- Procesamiento de reembolsos
- Seguimiento de devoluciones
- Políticas automáticas
- Gestión de inventario
- Documentación de devoluciones`
  },
  {
    id: "FL-109",
    title: "Automatizaciones de pedidos",
    description: "Sistema de automatización de procesos de pedidos",
    status: "pending",
    components: [
      "OrderAutomation.tsx",
      "RuleEngine.tsx",
      "AutomationLogs.tsx"
    ],
    database: [
      "automation_rules (tabla)",
      "automation_logs (tabla)"
    ],
    details: `
- Reglas de automatización
- Acciones automáticas
- Condiciones personalizables
- Webhooks y integraciones
- Monitoreo de automatizaciones
- Registro de eventos`
  }
]