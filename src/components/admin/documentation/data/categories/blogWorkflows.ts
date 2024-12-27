import { WorkflowItem } from "../../types/WorkflowTypes"

export const blogWorkflows: WorkflowItem[] = [
  {
    id: "FL-401",
    title: "Gestión de artículos",
    description: "CRUD de artículos del blog",
    status: "pending",
    components: [
      "BlogEditor.tsx",
      "ArticleList.tsx"
    ],
    database: [
      "blog_posts (tabla)",
      "blog_categories (tabla)"
    ]
  },
  {
    id: "FL-402",
    title: "Generación automática de contenido",
    description: "Sistema de generación de contenido con IA",
    status: "pending",
    components: [
      "ContentGenerator.tsx",
      "AIIntegration.tsx"
    ],
    database: [
      "ai_generated_content (tabla)"
    ]
  }
]