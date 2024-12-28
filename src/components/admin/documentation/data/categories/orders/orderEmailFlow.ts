import { WorkflowItem } from "../../../types/WorkflowTypes"

export const orderEmailFlow: WorkflowItem = {
  id: "FL-105",
  title: "Sistema de emails de pedidos",
  description: "Gestión de notificaciones y comunicaciones por email",
  status: "working",
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
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ Triggers configurados
✓ Plantillas de email diseñadas
✓ Sistema de preview implementado
✓ Componentes de estado implementados

Pendiente integración:
- Conexión con Brevo
- Sistema de retry automático
- Logs de delivery status`
}