# Tabla: Profiles

Esta tabla extiende la información de usuarios de Supabase auth.users.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | ID del usuario (referencia a auth.users) | ✅ |
| role | enum | Rol del usuario (client/manager/admin) | ✅ |
| full_name | text | Nombre completo | ✅ |
| phone | text | Número de teléfono | ❌ |
| manager_type | enum | Tipo de manager (physical/esim) | ❌ |
| documentation_status | enum | Estado de documentación (pending/verified/rejected) | ❌ |
| metadata | jsonb | Datos adicionales específicos del rol | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `role` para filtrado
3. Índice en `manager_type` para filtrado de managers

## Políticas de Seguridad (RLS)

### Lectura
- Usuario puede leer su propio perfil
- Managers pueden leer perfiles de clientes asignados
- Admin puede leer todos los perfiles

### Escritura
- Usuario puede actualizar su propio perfil (campos limitados)
- Admin puede crear/actualizar cualquier perfil
- Sistema puede actualizar estados automáticamente

## Triggers

1. Actualización automática de `updated_at`
2. Notificación al admin cuando se registra un nuevo manager
3. Validación de documentación para managers

## Notas
- Los managers requieren documentación adicional
- El campo metadata puede contener información específica del rol
- Se mantiene historial de cambios importantes