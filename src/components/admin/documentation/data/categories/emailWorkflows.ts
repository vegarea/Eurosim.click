import { WorkflowItem } from "../../types/WorkflowTypes"

export const emailWorkflows: WorkflowItem[] = [
  {
    id: "FL-501",
    title: "Gestión de plantillas de email",
    description: "Sistema de gestión y edición de plantillas para diferentes tipos de emails",
    status: "working",
    components: [
      "AdminEmails.tsx",
      "EmailTemplateDialog.tsx",
      "EmailTemplateCard.tsx",
      "EmailTemplateContentForm.tsx",
      "EmailTemplateDetailsForm.tsx"
    ],
    database: [
      "email_templates (tabla)"
    ],
    details: `
- CRUD completo de plantillas de email
- Editor visual con formato HTML
- Variables dinámicas por tipo de plantilla
- Previsualización de plantillas
- Filtrado por tipo (eSIM/física/ambos)
- Estado activo/inactivo de plantillas`
  },
  {
    id: "FL-502",
    title: "Envío automático de emails",
    description: "Sistema de envío automático basado en eventos del sistema",
    status: "working",
    components: [
      "OrderStatusConfirmDialog.tsx",
      "EmailLogs.tsx"
    ],
    database: [
      "email_templates (tabla)",
      "email_logs (tabla)"
    ],
    details: `
- Integración con Brevo para envío de emails
- Envío automático al cambiar estado de orden
- Registro de emails enviados
- Visualización de historial de envíos
- Reemplazo automático de variables`
  },
  {
    id: "FL-503",
    title: "Configuración del servicio de email",
    description: "Gestión de configuraciones del servicio de email (Brevo)",
    status: "working",
    components: [
      "ApiKeySetup.tsx",
      "EmailIntegration.tsx"
    ],
    database: [],
    details: `
- Configuración de API key de Brevo
- Validación de credenciales
- Almacenamiento seguro de API key
- Interfaz de configuración en settings`
  }
]