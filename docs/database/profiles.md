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

## Roles y Permisos

### Cliente (client)
- Creado automáticamente en checkout
- Acceso solo por magic link
- No requiere contraseña
- Permisos limitados a sus propios datos

### Manager (manager)
- Creado manualmente por admin
- Tipos: physical o esim
- Requiere documentación verificada
- Acceso a pedidos de su tipo

### Administrador (admin)
- Creado manualmente en Supabase
- Acceso total al sistema
- Puede crear otros managers

## Políticas de Seguridad (RLS)

### Lectura
- Usuario puede leer su propio perfil
- Managers pueden leer perfiles de clientes asignados
- Admin puede leer todos los perfiles

### Escritura
- Sistema puede crear perfiles automáticamente
- Admin puede crear/actualizar cualquier perfil
- Usuario no puede modificar su perfil directamente

## Triggers

1. Actualización automática de `updated_at`
2. Notificación al admin cuando se registra un nuevo manager
3. Validación de documentación para managers

## Notas sobre Autenticación
- No se almacenan contraseñas
- Magic links son el único método de acceso para clientes
- Managers y admins son creados manualmente
- Se mantiene registro de todos los accesos