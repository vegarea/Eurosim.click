import { WorkflowItem } from "../../../types/WorkflowTypes"

export const mediaWorkflows: WorkflowItem[] = [
  {
    id: "FL-403",
    title: "Gestión de imágenes del blog",
    description: "Sistema completo de gestión de imágenes para artículos",
    status: "working",
    components: [
      "ImageUploader.tsx",
      "ImageGallery.tsx",
      "ImageEditor.tsx"
    ],
    database: [
      "blog_post_images (tabla)",
      "image_categories (tabla)"
    ],
    details: `
✓ Tablas creadas y conectadas
✓ Políticas RLS configuradas
✓ UI de carga implementada
✓ Galería funcionando
✓ Editor básico implementado

Pendiente integración:
- Almacenamiento en Supabase Storage
- Optimización automática
- Gestión de categorías`
  }
]