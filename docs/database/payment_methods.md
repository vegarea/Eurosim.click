# Tabla: Payment Methods

Esta tabla almacena los métodos de pago disponibles.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del método | ✅ |
| name | text | Nombre del método | ✅ |
| type | text | Tipo de método (stripe/paypal) | ✅ |
| is_active | boolean | Si está activo | ✅ |
| config | jsonb | Configuración del método | ✅ |
| metadata | jsonb | Información adicional | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `type` para filtrado
3. Índice en `is_active` para filtrado rápido

## Políticas de Seguridad (RLS)

### Lectura
- Público: Puede ver métodos activos
- Admin: Puede ver todos los métodos
- Sistema: Puede leer para procesamiento

### Escritura
- Admin: Puede crear y actualizar métodos
- Sistema: No puede modificar directamente

## Configuración

La configuración puede incluir:
- Credenciales de API
- URLs de webhook
- Configuración de procesamiento
- Límites y restricciones