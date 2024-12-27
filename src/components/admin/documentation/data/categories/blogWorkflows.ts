import { WorkflowItem } from "../../types/WorkflowTypes"

export const blogWorkflows: WorkflowItem[] = [
  {
    id: "FL-401",
    title: "Gestión de artículos",
    description: "CRUD completo de artículos del blog",
    status: "reviewed",
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
✓ UI de listado de artículos implementada
✓ Formulario de creación/edición listo
✓ Vista previa de artículos funcionando
✓ Sistema de borradores implementado
✓ UI de programación de publicación lista

Pendiente conexión con Supabase para:
- Persistencia de artículos
- Gestión de estados
- Programación de publicaciones`
  },
  {
    id: "FL-402",
    title: "Generación automática de contenido",
    description: "Sistema de generación de contenido con IA",
    status: "reviewed",
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
✓ UI de configuración de prompts implementada
✓ Panel de automatización funcionando
✓ Interfaz de revisión de contenido lista
✓ Sistema de temas implementado

Pendiente conexión con Supabase para:
- Integración con OpenAI
- Almacenamiento de contenido generado
- Historial de generación`
  },
  {
    id: "FL-403",
    title: "Gestión de imágenes del blog",
    description: "Sistema completo de gestión de imágenes para artículos",
    status: "reviewed",
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
✓ UI de carga de imágenes implementada
✓ Galería de imágenes funcionando
✓ Editor básico de imágenes listo
✓ Sistema de miniaturas diseñado

Pendiente conexión con Supabase para:
- Almacenamiento de imágenes
- Optimización automática
- Gestión de categorías`
  },
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
✓ Editor de meta títulos y descripciones implementado
✓ Vista previa de snippets funcionando
✓ Vista previa de redes sociales lista
✓ Análisis de palabras clave funcionando
✓ Sugerencias SEO implementadas
✓ UI completa y responsive`
  },
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
✓ Gestión de categorías implementada
✓ Sistema de etiquetas funcionando
✓ Jerarquía de categorías lista
✓ URLs amigables generadas
✓ Estadísticas por categoría funcionando
✓ UI completa y responsive`
  },
  {
    id: "FL-406",
    title: "Análisis y estadísticas",
    description: "Sistema de análisis y métricas del blog",
    status: "reviewed",
    components: [
      "BlogAnalytics.tsx",
      "PostMetrics.tsx",
      "PerformanceChart.tsx"
    ],
    database: [
      "blog_metrics (tabla)",
      "post_views (tabla)",
      "user_interactions (tabla)"
    ],
    details: `
✓ UI de métricas implementada
✓ Gráficos de rendimiento funcionando
✓ Vista de interacciones lista
✓ Reportes exportables diseñados

Pendiente conexión con Supabase para:
- Tracking de vistas
- Almacenamiento de métricas
- Generación de reportes`
  },
  {
    id: "FL-407",
    title: "Comentarios y moderación",
    description: "Sistema de comentarios y moderación de contenido",
    status: "reviewed",
    components: [
      "CommentsManager.tsx",
      "ModerationQueue.tsx",
      "CommentFilters.tsx"
    ],
    database: [
      "blog_comments (tabla)",
      "comment_reports (tabla)",
      "moderation_logs (tabla)"
    ],
    details: `
✓ UI de comentarios implementada
✓ Cola de moderación diseñada
✓ Filtros de spam configurados
✓ Sistema de reportes listo

Pendiente conexión con Supabase para:
- Persistencia de comentarios
- Historial de moderación
- Sistema de reportes`
  },
  {
    id: "FL-408",
    title: "Publicación y programación",
    description: "Sistema de publicación y programación de contenido",
    status: "working",
    components: [
      "PublishingManager.tsx",
      "ScheduleCalendar.tsx",
      "PublishQueue.tsx"
    ],
    database: [
      "blog_posts (tabla)",
      "publishing_schedule (tabla)",
      "publishing_logs (tabla)"
    ],
    details: `
✓ Calendario editorial implementado
✓ Sistema de programación funcionando
✓ Cola de publicación lista
✓ Estados de publicación gestionados
✓ Notificaciones configuradas
✓ UI completa y responsive`
  }
]