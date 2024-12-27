# Tabla: Payments

Esta tabla almacena la información de pagos de los pedidos.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del pago | ✅ |
| order_id | uuid | ID del pedido | ✅ |
| amount | integer | Monto en centavos | ✅ |
| currency | text | Código de moneda | ✅ |
| status | text | Estado del pago | ✅ |
| payment_method_id | uuid | ID del método de pago | ✅ |
| provider_payment_id | text | ID del pago en el proveedor | ✅ |
| provider_receipt_url | text | URL del recibo | ❌ |
| metadata | jsonb | Información adicional | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `order_id` para búsqueda
3. Índice en `status` para filtrado
4. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver sus propios pagos
- Admin: Puede ver todos los pagos
- Sistema: Puede leer para procesamiento

### Escritura
- Sistema: Puede crear y actualizar pagos
- Admin: Puede actualizar estados
- Cliente: No puede modificar directamente

## Relaciones

- Se relaciona con `orders` a través de `order_id`
- Se relaciona con `payment_methods` a través de `payment_method_id`

## Estados de Pago

- pending: Pendiente
- processing: Procesando
- completed: Completado
- failed: Fallido
- refunded: Reembolsado
- cancelled: Cancelado