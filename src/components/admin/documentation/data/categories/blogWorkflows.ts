import { WorkflowItem } from "../../types/WorkflowTypes"

export const blogWorkflows: WorkflowItem[] = [
  {
    id: "FL-401",
    title: "Gestión de artículos",
    description: "CRUD completo de artículos del blog",
    status: "pending",
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
- Crear nuevo artículo
- Editar artículo existente
- Eliminar artículo
- Vista previa antes de publicar
- Guardar como borrador
- Programar publicación
- Sistema de categorías y etiquetas`
  },
  {
    id: "FL-402",
    title: "Generación automática de contenido",
    description: "Sistema de generación de contenido con IA",
    status: "pending",
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
- Configuración de prompts base
- Programación de generación automática
- Revisión y edición de contenido generado
- Control de calidad automático
- Historial de generación`
  },
  {
    id: "FL-403",
    title: "Gestión de imágenes del blog",
    description: "Sistema completo de gestión de imágenes para artículos",
    status: "pending",
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
- Subida de imágenes
- Galería de imágenes
- Optimización automática
- Generación de miniaturas
- Edición básica (recorte, redimensión)
- Generación de imágenes con IA`
  },
  {
    id: "FL-404",
    title: "SEO y metadatos",
    description: "Gestión de SEO y metadatos para artículos",
    status: "pending",
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
- Editor de meta títulos y descripciones
- Vista previa de snippets de búsqueda
- Vista previa de compartir en redes sociales
- Análisis de palabras clave
- Sugerencias de optimización SEO`
  },
  {
    id: "FL-405",
    title: "Categorías y taxonomía",
    description: "Sistema de organización y categorización de contenido",
    status: "pending",
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
- Gestión de categorías principales
- Sistema de etiquetas
- Jerarquía de categorías
- URLs amigables para categorías
- Estadísticas por categoría`
  },
  {
    id: "FL-406",
    title: "Análisis y estadísticas",
    description: "Sistema de análisis y métricas del blog",
    status: "pending",
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
- Vistas por artículo
- Tiempo de lectura
- Interacciones de usuarios
- Rendimiento por categoría
- Tendencias de contenido
- Reportes exportables`
  },
  {
    id: "FL-407",
    title: "Comentarios y moderación",
    description: "Sistema de comentarios y moderación de contenido",
    status: "pending",
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
- Gestión de comentarios
- Cola de moderación
- Filtros de spam
- Sistema de reportes
- Historial de moderación
- Configuración de políticas de moderación`
  },
  {
    id: "FL-408",
    title: "Publicación y programación",
    description: "Sistema de publicación y programación de contenido",
    status: "pending",
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
- Calendario editorial
- Programación de publicaciones
- Cola de publicación
- Estados de publicación
- Notificaciones automáticas
- Historial de publicaciones`
  }
]