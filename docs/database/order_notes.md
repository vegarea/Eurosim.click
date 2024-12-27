# Tabla: Order Notes

Esta tabla almacena las notas asociadas a los pedidos.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único de la nota | ✅ |
| order_id | uuid | ID del pedido | ✅ |
| user_id | uuid | ID del usuario que creó la nota | ✅ |
| content | text | Contenido de la nota | ✅ |
| type | text | Tipo de nota | ✅ |
| is_internal | boolean | Si es nota interna | ✅ |
| metadata | jsonb | Información adicional | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `order_id` para búsqueda
3. Índice en `user_id` para filtrado
4. Índice en `type` para categorización
5. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver notas públicas de sus pedidos
- Admin/Manager: Puede ver todas las notas
- Sistema: Puede leer para procesamiento

### Escritura
- Cliente: Puede crear notas públicas en sus pedidos
- Admin/Manager: Puede crear cualquier tipo de nota
- Sistema: Puede crear notas automáticas

## Tipos de Notas

- customer: Nota del cliente
- support: Nota de soporte
- system: Nota del sistema
- internal: Nota interna