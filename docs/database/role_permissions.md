# Tabla: Role Permissions

Esta tabla gestiona los permisos específicos para cada rol.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | ID único del permiso | ✅ |
| role | enum | Rol (client/manager/admin) | ✅ |
| resource | text | Recurso afectado | ✅ |
| action | enum | Tipo de permiso (read/write/admin/none) | ✅ |
| conditions | jsonb | Condiciones específicas del permiso | ❌ |
| created_by | uuid | ID del admin que creó el permiso | ✅ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice compuesto en (role, resource) para búsqueda rápida
3. Índice en `created_at` para auditoría

## Políticas de Seguridad (RLS)

### Lectura
- Todos los usuarios autenticados pueden leer
- Caché de permisos en el cliente

### Escritura
- Solo admin puede modificar permisos
- Se requiere registro de cambios

## Triggers

1. Actualización automática de `updated_at`
2. Registro en tabla de auditoría al modificar
3. Validación de consistencia de permisos

## Notas
- Los permisos se verifican en cada operación
- Sistema de caché para optimizar rendimiento
- Registro detallado de cambios para auditoría