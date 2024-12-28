import { WorkflowItem } from "../../../types/WorkflowTypes"

export const contentWorkflows: WorkflowItem[] = [
  {
    id: "FL-401",
    title: "Gestión de artículos",
    description: "CRUD completo de artículos del blog",
    status: "working",
    components: [
      "BlogEditor.tsx",
      "ArticleList.tsx",
      "ArticleForm.tsx"
    ],
    database: [
      "blog_posts (tabla)",
      "blog_categories (tabla)"
    ],
    details: `
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ Triggers configurados
✓ UI de listado implementada
✓ Formularios implementados
✓ Sistema de borradores funcionando

Pendiente integración:
- Persistencia de artículos
- Gestión de estados
- Programación de publicaciones`
  },
  {
    id: "FL-402",
    title: "Generación automática de contenido",
    description: "Sistema de generación de contenido con IA",
    status: "working",
    components: [
      "ContentGenerator.tsx",
      "AIIntegration.tsx",
      "AutomationSettings.tsx"
    ],
    database: [
      "blog_posts (tabla)",
      "ai_generated_content (tabla)",
      "ai_prompts (tabla)"
    ],
    details: `
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ UI de configuración implementada
✓ Panel de automatización funcionando

Pendiente integración:
- Integración con OpenAI
- Almacenamiento de contenido
- Historial de generación`
  }
]