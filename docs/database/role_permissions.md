# Tabla: Role Permissions

Esta tabla gestiona los permisos específicos para cada rol en el sistema.

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
2. Índice en `role` para búsquedas rápidas
3. Índice compuesto en (role, resource) para validación de permisos
4. Índice en `created_at` para auditoría

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todos los permisos
- Manager: Solo puede ver sus propios permisos
- Cliente: Solo puede ver sus propios permisos
- Sistema: Puede leer todos los permisos para validación

### Escritura
- Admin: Puede crear y modificar permisos
- Otros roles: Sin permisos de escritura

## Triggers
1. Actualización automática de `updated_at`
2. Validación de roles permitidos
3. Registro de cambios en tabla de auditoría

## Notas
- Los permisos se validan en tiempo real
- Se mantiene un historial de cambios
- Las condiciones pueden incluir filtros específicos por usuario o departamento
- Los permisos son acumulativos (un rol puede tener múltiples permisos)