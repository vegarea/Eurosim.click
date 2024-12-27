import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderEmailFlow: WorkflowItem = {
  id: "FL-105",
  title: "Notificaciones por email de pedidos",
  description: "Sistema de notificaciones por email para actualizaciones de pedidos",
  status: "pending",
  components: [
    "EmailTemplateCard.tsx",
    "EmailTemplateDialog.tsx",
    "EmailTemplateContentForm.tsx",
    "EmailTemplateDetailsForm.tsx"
  ],
  database: [
    "email_templates (tabla)",
    "email_logs (tabla)"
  ],
  details: `
- Plantillas de email personalizables
- Notificaciones automáticas por cambio de estado
- Variables dinámicas en plantillas
- Historial de emails enviados
- Configuración de remitente y firma
- Integración con Brevo para envío de emails`
}