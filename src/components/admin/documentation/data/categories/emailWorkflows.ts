import { WorkflowItem } from "../../types/WorkflowTypes"

export const emailWorkflows: WorkflowItem[] = [
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