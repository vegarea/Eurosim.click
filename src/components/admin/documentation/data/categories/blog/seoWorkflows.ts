import { WorkflowItem } from "../../../types/WorkflowTypes"

export const seoWorkflows: WorkflowItem[] = [
  {
    id: "FL-404",
    title: "SEO y metadatos",
    description: "Gestión de SEO y metadatos para artículos",
    status: "working",
    components: [
      "SeoForm.tsx",
      "MetadataPreview.tsx",
      "SocialPreview.tsx"
    ],
    database: [
      "blog_posts (tabla)",
      "seo_metadata (tabla)"
    ],
    details: `
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ Editor de meta títulos implementado
✓ Vista previa funcionando
✓ Análisis de palabras clave implementado`
  }
]