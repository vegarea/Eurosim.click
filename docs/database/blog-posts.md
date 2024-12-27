# Blog Posts Table

Esta tabla almacena los artículos del blog, incluyendo tanto posts manuales como los generados automáticamente por IA.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del post | ✅ |
| title | text | Título del artículo | ✅ |
| slug | text | URL amigable del artículo | ✅ |
| content | text | Contenido del artículo en formato HTML | ✅ |
| excerpt | text | Resumen corto del artículo | ✅ |
| status | text | Estado del post: 'draft', 'published', 'scheduled' | ✅ |
| author_id | uuid | ID del autor (referencia a users) | ✅ |
| featured_image_id | uuid | ID de la imagen destacada (referencia a blog_post_images) | ❌ |
| published_at | timestamp | Fecha de publicación | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| is_ai_generated | boolean | Indica si fue generado por IA | ✅ |
| ai_prompt | text | Prompt utilizado para generar el contenido | ❌ |
| ai_model | text | Modelo de IA utilizado (ej: 'gpt-4') | ❌ |
| seo_title | text | Título optimizado para SEO | ❌ |
| seo_description | text | Descripción para meta tags | ❌ |
| views_count | integer | Contador de vistas | ✅ |
| scheduled_for | timestamp | Fecha programada para publicación | ❌ |

## Índices
- `idx_blog_posts_slug` en `slug` (único)
- `idx_blog_posts_status` en `status`
- `idx_blog_posts_published_at` en `published_at`
- `idx_blog_posts_views` en `views_count`

## Políticas de Seguridad (RLS)
- Lectura pública para posts publicados
- Escritura/modificación solo para usuarios autenticados con rol 'admin' o 'editor'
- Eliminación solo para usuarios con rol 'admin'

## Triggers
- Actualizar `updated_at` automáticamente
- Generar `slug` automáticamente desde el título
- Incrementar `views_count` en cada vista

## Notas
- Los posts generados por IA se marcan con `is_ai_generated = true`
- El campo `scheduled_for` se usa para la publicación programada
- El contenido HTML debe ser sanitizado antes de almacenarse