# Documentación de Tablas

Este directorio contiene la documentación detallada de cada tabla en la base de datos.

## Estructura

Cada archivo markdown corresponde a una tabla específica y contiene:
- Definición de campos
- Índices
- Políticas de seguridad (RLS)
- Relaciones con otras tablas

## Archivos

- `products.md`: Productos (SIMs físicas y eSIMs)
- `orders.md`: Pedidos y transacciones
- `customers.md`: Información de clientes
- `blog-posts.md`: Artículos del blog (manuales y generados por IA)
- `blog-post-images.md`: Imágenes de los artículos
- `email-templates.md`: Plantillas de correo electrónico
- `workflows.md`: Flujos de trabajo del sistema
- `workflow_categories.md`: Categorías de flujos de trabajo
- `workflow_events.md`: Eventos y cambios en flujos de trabajo
- `auth_logs.md`: Registro de eventos de autenticación

## Notas sobre Automatización

La generación automática de contenido utiliza:
- OpenAI API para generación de texto
- Cron jobs para publicación programada
- Políticas de seguridad específicas para contenido autogenerado