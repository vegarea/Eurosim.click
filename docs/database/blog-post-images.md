# Blog Post Images Table

Esta tabla gestiona las imágenes asociadas a los posts del blog, incluyendo metadatos y diferentes variantes de tamaño.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único de la imagen | ✅ |
| post_id | uuid | ID del post asociado (referencia a blog_posts) | ✅ |
| url | text | URL de la imagen en el storage | ✅ |
| thumbnail_url | text | URL de la versión miniatura | ❌ |
| alt_text | text | Texto alternativo para accesibilidad | ✅ |
| caption | text | Pie de foto o descripción | ❌ |
| width | integer | Ancho de la imagen en píxeles | ✅ |
| height | integer | Alto de la imagen en píxeles | ✅ |
| size_bytes | integer | Tamaño del archivo en bytes | ✅ |
| mime_type | text | Tipo MIME de la imagen | ✅ |
| is_featured | boolean | Indica si es la imagen destacada del post | ✅ |
| position | integer | Orden de la imagen en el post | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| is_ai_generated | boolean | Indica si fue generada por IA | ✅ |
| ai_prompt | text | Prompt utilizado para generar la imagen | ❌ |
| storage_path | text | Ruta en el bucket de storage | ✅ |

## Índices
- `idx_blog_post_images_post_id` en `post_id`
- `idx_blog_post_images_featured` en `(post_id, is_featured)`

## Políticas de Seguridad (RLS)
- Lectura pública para imágenes de posts publicados
- Escritura/modificación solo para usuarios autenticados con rol 'admin' o 'editor'
- Eliminación solo para usuarios con rol 'admin'

## Triggers
- Actualizar `updated_at` automáticamente
- Generar miniaturas automáticamente al subir una imagen
- Limpiar storage al eliminar una imagen

## Relaciones
- `post_id` referencia `blog_posts(id)` con ON DELETE CASCADE

## Notas
- Las imágenes se almacenan en Supabase Storage
- Se generan automáticamente diferentes tamaños para optimización
- Soporte para imágenes generadas por IA (DALL-E, Stable Diffusion)