# Tabla: Workflow Categories

Esta tabla almacena las categorías de los flujos de trabajo.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único de la categoría | ✅ |
| title | text | Nombre de la categoría | ✅ |
| description | text | Descripción de la categoría | ✅ |
| slug | text | Identificador amigable (auth/orders/etc) | ✅ |
| icon | text | Nombre del icono de Lucide | ❌ |
| metadata | jsonb | Información adicional flexible | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice único en `slug`
3. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todas las categorías
- Dev: Puede ver todas las categorías
- Sistema: Puede leer para referencias

### Escritura
- Admin: Puede crear y actualizar categorías
- Dev: Solo lectura
- Sistema: Solo lectura

## Relaciones

- Tiene múltiples flujos en la tabla `workflows`

## Triggers

1. Actualización automática de `updated_at`
2. Validación de formato de slug
3. Conversión automática de slug a minúsculas

## Notas Adicionales

- El campo `icon` debe corresponder a un nombre válido de icono de Lucide-React
- El slug debe ser único y seguir el formato kebab-case
- Las categorías son fundamentales para la organización de la documentación