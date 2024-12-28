import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderEmailFlow: WorkflowItem = {
  id: "FL-105",
  title: "Sistema de emails de pedidos",
  description: "Gestión de notificaciones y comunicaciones por email",
  status: "reviewed",
  components: [
    "EmailTemplates.tsx",
    "OrderEmailPreview.tsx",
    "EmailStatusBadge.tsx"
  ],
  database: [
    "email_templates (tabla)",
    "email_logs (tabla)"
  ],
  details: `
Implementado y revisado:
✓ Plantillas de email diseñadas
✓ Sistema de preview de emails
✓ Componentes de estado de envío
✓ Personalización de contenido

Pendiente conexión Supabase:
- Integración con Brevo
- Registro de envíos en BD
- Sistema de retry automático
- Logs de delivery status`
}