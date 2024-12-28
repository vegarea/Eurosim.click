# Tabla: Orders

Esta tabla almacena la información de los pedidos realizados en la plataforma.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del pedido | ✅ |
| customer_id | uuid | ID del cliente que realizó el pedido | ✅ |
| product_id | uuid | ID del producto ordenado | ✅ |
| status | enum | Estado del pedido | ✅ |
| type | enum | Tipo de pedido (physical/esim) | ✅ |
| total_amount | integer | Monto total en centavos | ✅ |
| quantity | integer | Cantidad de productos | ✅ |
| payment_method | enum | Método de pago (stripe/paypal) | ✅ |
| payment_status | enum | Estado del pago | ✅ |
| stripe_payment_intent_id | text | ID de la intención de pago en Stripe | ❌ |
| stripe_receipt_url | text | URL del recibo de Stripe | ❌ |
| paypal_order_id | text | ID de la orden en PayPal | ❌ |
| paypal_receipt_url | text | URL del recibo de PayPal | ❌ |
| shipping_address | jsonb | Dirección de envío (solo SIM física) | ❌ |
| tracking_number | text | Número de seguimiento (solo SIM física) | ❌ |
| carrier | text | Empresa de envío (solo SIM física) | ❌ |
| activation_date | timestamp | Fecha de activación solicitada | ❌ |
| notes | text[] | Notas internas sobre el pedido | ❌ |
| metadata | jsonb | Información adicional flexible | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver sus propios pedidos
- Admin/Manager: Puede ver todos los pedidos
- Sistema: Puede leer para procesamiento
- Público: Sin acceso

### Escritura
- Cliente: No puede crear ni modificar pedidos directamente
- Admin: Puede actualizar pedidos
- Sistema: Puede crear y actualizar pedidos automáticamente
- Webhook de Stripe: Puede crear pedidos (service_role key)

### Políticas SQL

```sql
-- Permitir creación desde webhook de Stripe (usando service_role)
CREATE POLICY "Allow Stripe webhook to create orders"
ON orders FOR INSERT
TO service_role
WITH CHECK (true);

-- Permitir lectura al cliente de sus propios pedidos
CREATE POLICY "Users can view own orders"
ON orders FOR SELECT
USING (auth.uid() IN (
  SELECT id FROM customers WHERE id = customer_id
));

-- Permitir lectura a admins
CREATE POLICY "Admins can view all orders"
ON orders FOR SELECT
TO authenticated
USING (auth.jwt() ? 'is_admin');

-- Permitir actualización a admins
CREATE POLICY "Admins can update orders"
ON orders FOR UPDATE
TO authenticated
USING (auth.jwt() ? 'is_admin');
```

## Índices

1. Índice primario en `id`
2. Índice en `customer_id` para búsqueda rápida de pedidos por cliente
3. Índice en `status` para filtrado por estado
4. Índice en `payment_status` para seguimiento de pagos
5. Índice en `created_at` para ordenamiento cronológico

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver solo sus propios pedidos
- Admin: Puede ver todos los pedidos
- Sistema: Puede leer pedidos para procesamiento automático

### Escritura
- Cliente: Puede crear pedidos
- Admin: Puede actualizar el estado y añadir notas
- Sistema: Puede actualizar estados y tracking automáticamente

## Relaciones

- Se relaciona con `customers` a través de `customer_id`
- Se relaciona con `products` a través de `product_id`
- Puede tener múltiples eventos en la tabla `order_events`
- Puede tener múltiples notas en la tabla `order_notes`

## Triggers

1. Actualización automática de `updated_at`
2. Creación de evento en `order_events` al cambiar el estado
3. Notificación al cliente cuando cambia el estado
4. Validación de stock al crear pedido de SIM física
5. Actualización de stock al completar/cancelar pedido

## Notas Adicionales

- Los montos se almacenan en centavos para evitar problemas con decimales
- El campo `shipping_address` es un objeto JSON con la estructura:
  ```json
  {
    "street": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "postal_code": "string",
    "phone": "string"
  }
  ```
- El campo `metadata` puede incluir información específica del proveedor de pagos
- Los estados del pedido siguen un flujo específico y no todos los estados son válidos para todos los tipos de pedido
