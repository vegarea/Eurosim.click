# Tabla: Internal Comments

Esta tabla almacena comentarios internos del equipo sobre pedidos.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del comentario | ✅ |
| order_id | uuid | ID del pedido | ✅ |
| user_id | uuid | ID del usuario que comentó | ✅ |
| content | text | Contenido del comentario | ✅ |
| priority | text | Prioridad del comentario | ❌ |
| resolved | boolean | Si está resuelto | ✅ |
| resolved_by | uuid | ID del usuario que resolvió | ❌ |
| resolved_at | timestamp | Fecha de resolución | ❌ |
| metadata | jsonb | Información adicional | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `order_id` para búsqueda
3. Índice en `user_id` para filtrado
4. Índice en `priority` para ordenamiento
5. Índice en `resolved` para filtrado
6. Índice en `created_at` para ordenamiento cronológico

## Políticas de Seguridad (RLS)

### Lectura
- Admin/Manager: Puede ver todos los comentarios
- Sistema: Puede leer para procesamiento
- Cliente: No tiene acceso

### Escritura
- Admin/Manager: Puede crear y resolver comentarios
- Sistema: Puede crear comentarios automáticos
- Cliente: No tiene acceso

## Prioridades

- high: Alta prioridad
- medium: Prioridad media
- low: Baja prioridad

## Relaciones

- Se relaciona con `orders` a través de `order_id`
- Se relaciona con `auth.users` a través de `user_id` y `resolved_by`