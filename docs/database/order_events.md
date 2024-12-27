# Tabla: Order Events

Esta tabla registra todos los eventos relacionados con pedidos.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del evento | ✅ |
| order_id | uuid | ID del pedido | ✅ |
| type | text | Tipo de evento | ✅ |
| description | text | Descripción del evento | ✅ |
| user_id | uuid | ID del usuario que generó el evento | ❌ |
| metadata | jsonb | Información adicional del evento | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `order_id` para búsqueda de eventos
3. Índice en `type` para filtrado
4. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver eventos de sus pedidos
- Admin/Manager: Puede ver todos los eventos
- Sistema: Puede leer para procesamiento

### Escritura
- Sistema: Registra eventos automáticos
- Admin/Manager: Puede crear eventos manualmente
- Cliente: No puede escribir directamente

## Relaciones

- Se relaciona con `orders` a través de `order_id`
- Se relaciona con `auth.users` a través de `user_id`

## Tipos de Eventos

- created: Creación del pedido
- status_changed: Cambio de estado
- payment_processed: Procesamiento de pago
- shipping_updated: Actualización de envío
- note_added: Nota añadida
- document_validated: Documentación validada