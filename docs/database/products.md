# Tabla: Products

Esta tabla almacena la información de los productos disponibles en la plataforma, incluyendo tanto SIMs físicas como eSIMs.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del producto | ✅ |
| type | enum | Tipo de producto (physical/esim) | ✅ |
| title | text | Nombre del producto | ✅ |
| description | text | Descripción detallada | ✅ |
| price | integer | Precio en centavos | ✅ |
| features | text[] | Lista de características | ✅ |
| europe_gb | integer | GB disponibles en Europa | ❌ |
| spain_gb | integer | GB disponibles en España | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| status | enum | Estado del producto (active/inactive) | ✅ |
| stock | integer | Cantidad disponible (solo SIMs físicas) | ❌ |
| metadata | jsonb | Información adicional flexible | ❌ |

## Índices

1. Índice primario en `id`
2. Índice en `type` para filtrado rápido
3. Índice en `status` para filtrado de productos activos
4. Índice en `price` para ordenamiento y búsqueda por rango de precios

## Políticas de Seguridad (RLS)

### Lectura
- Público: Puede ver productos activos
- Admin: Puede ver todos los productos

### Escritura
- Admin: Puede crear, actualizar y eliminar productos
- Sistema: Puede actualizar el stock automáticamente

## Relaciones

- Se relaciona con `orders` a través de referencias en la tabla de pedidos
- Los productos pueden aparecer en múltiples pedidos

## Triggers

1. Actualización automática de `updated_at` al modificar el registro
2. Validación de stock mínimo para SIMs físicas
3. Notificación cuando el stock está bajo el mínimo configurado

## Notas Adicionales

- Los precios se almacenan en centavos para evitar problemas con decimales
- El campo `metadata` permite almacenar información adicional sin modificar la estructura
- El stock solo es relevante para SIMs físicas, las eSIMs tienen stock ilimitado