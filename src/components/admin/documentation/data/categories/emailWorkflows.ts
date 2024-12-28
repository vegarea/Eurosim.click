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
      "email_logs (tabla)",
      "api_configurations (tabla)"
    ],
    details: `
✓ Integración con Brevo completada
✓ Envío automático al cambiar estado de orden implementado
✓ Registro de emails enviados funcionando
✓ Visualización de historial de envíos activa
✓ Reemplazo automático de variables implementado
✓ Conexión con Supabase establecida:
  - Políticas RLS configuradas
  - Triggers para cambios de estado
  - Registro de emails enviados
  - Plantillas de email persistidas`
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
    database: [
      "api_configurations (tabla)"
    ],
    details: `
✓ Configuración de API key de Brevo implementada
✓ Validación de credenciales funcionando
✓ Almacenamiento seguro de API key en Supabase
✓ Interfaz de configuración en settings completada
✓ Sistema de validación automática implementado
✓ Integración con Supabase Vault completada
✓ Políticas de seguridad RLS configuradas`
  }
]