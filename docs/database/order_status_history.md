# Tabla: Order Status History

Esta tabla mantiene un historial completo de cambios de estado en los pedidos.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del registro | ✅ |
| order_id | uuid | ID del pedido | ✅ |
| old_status | text | Estado anterior | ✅ |
| new_status | text | Nuevo estado | ✅ |
| changed_by | uuid | ID del usuario que realizó el cambio | ✅ |
| reason | text | Razón del cambio | ❌ |
| metadata | jsonb | Información adicional del cambio | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `order_id` para búsqueda de historial
3. Índice en `created_at` para ordenamiento cronológico
4. Índice en `changed_by` para auditoría

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver historial de sus pedidos
- Admin/Manager: Puede ver todo el historial
- Sistema: Puede leer para procesamiento

### Escritura
- Sistema: Registra cambios automáticos
- Admin/Manager: Registra cambios manuales
- Cliente: No puede escribir directamente

## Relaciones

- Se relaciona con `orders` a través de `order_id`
- Se relaciona con `auth.users` a través de `changed_by`

## Triggers

1. Validación de estados válidos
2. Notificación al cliente cuando aplique
3. Registro en `order_events`