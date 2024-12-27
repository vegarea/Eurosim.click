# Tabla: Order Items

Esta tabla almacena los items individuales de cada pedido.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del item | ✅ |
| order_id | uuid | ID del pedido al que pertenece | ✅ |
| product_id | uuid | ID del producto | ✅ |
| quantity | integer | Cantidad del producto | ✅ |
| unit_price | integer | Precio unitario en centavos | ✅ |
| total_price | integer | Precio total en centavos | ✅ |
| metadata | jsonb | Información adicional del item | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `order_id` para búsquedas
3. Índice en `product_id` para reportes
4. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver items de sus propios pedidos
- Admin/Manager: Puede ver todos los items
- Sistema: Puede leer para procesamiento

### Escritura
- Sistema: Puede crear items al procesar pedidos
- Admin: Puede modificar items existentes
- Cliente: No puede modificar items directamente

## Relaciones

- Se relaciona con `orders` a través de `order_id`
- Se relaciona con `products` a través de `product_id`

## Triggers

1. Actualización automática de `updated_at`
2. Cálculo automático de `total_price` basado en `quantity` y `unit_price`
3. Validación de stock disponible al crear