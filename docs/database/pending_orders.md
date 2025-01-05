# Tabla: pending_orders

Esta tabla almacena temporalmente la información de órdenes pendientes antes de la confirmación del pago.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único de la orden pendiente | ✅ |
| shipping_address | jsonb | Dirección de envío completa | ✅ |
| customer_info | jsonb | Información del cliente | ✅ |
| order_info | jsonb | Información de la orden | ✅ |
| expires_at | timestamp | Fecha de expiración del registro | ✅ |
| created_at | timestamp | Fecha de creación | ✅ |

## Políticas RLS

- Permitir INSERT sin autenticación (para checkout de invitados)
- Permitir SELECT solo con el ID correcto
- Eliminar registros automáticamente después de 24 horas

## Índices

1. Índice primario en `id`
2. Índice en `expires_at` para limpieza automática