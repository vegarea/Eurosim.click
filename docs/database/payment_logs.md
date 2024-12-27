# Tabla: Payment Logs

Esta tabla registra todos los eventos relacionados con pagos.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del log | ✅ |
| payment_id | uuid | ID del pago | ✅ |
| type | text | Tipo de evento | ✅ |
| status | text | Estado del evento | ✅ |
| description | text | Descripción del evento | ✅ |
| raw_data | jsonb | Datos completos del evento | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `payment_id` para búsqueda
3. Índice en `type` para filtrado
4. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todos los logs
- Sistema: Puede leer para procesamiento
- Cliente: No tiene acceso

### Escritura
- Sistema: Registra eventos automáticamente
- Admin: No puede escribir directamente

## Tipos de Eventos

- payment.created
- payment.processing
- payment.succeeded
- payment.failed
- payment.refunded
- webhook.received
- webhook.processed
- error.processing