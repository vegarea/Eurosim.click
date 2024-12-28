import { WorkflowItem } from "../../../types/WorkflowTypes"

export const taxonomyWorkflows: WorkflowItem[] = [
  {
    id: "FL-405",
    title: "Categorías y taxonomía",
    description: "Sistema de organización y categorización de contenido",
    status: "working",
    components: [
      "CategoryManager.tsx",
      "TagManager.tsx",
      "TaxonomyEditor.tsx"
    ],
    database: [
      "blog_categories (tabla)",
      "blog_tags (tabla)",
      "post_categories (tabla)",
      "post_tags (tabla)"
    ],
    details: `
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ Gestión de categorías implementada
✓ Sistema de etiquetas funcionando
✓ URLs amigables generadas`
  }
]