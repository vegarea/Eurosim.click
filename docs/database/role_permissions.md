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

## Permisos por Rol

### Cliente (client)
- Ver su propio perfil
- Ver sus pedidos
- Ver productos disponibles
- Crear tickets de soporte
- No puede modificar datos directamente

### Manager
- Ver pedidos asignados según tipo (physical/esim)
- Actualizar estado de pedidos
- Ver perfiles de clientes asignados
- Acceso a documentación básica

### Admin
- Acceso total al sistema
- Crear/modificar managers
- Gestión de productos
- Configuración del sistema
- Ver métricas y reportes

## Políticas de Seguridad (RLS)

### Lectura
- Todos los usuarios autenticados pueden leer sus permisos
- Caché de permisos en el cliente

### Escritura
- Solo admin puede modificar permisos
- Se requiere registro de cambios

## Notas sobre Implementación
- Permisos verificados en cada operación
- Sistema de caché para optimizar rendimiento
- Registro detallado de cambios para auditoría
- No se requiere gestión de contraseñas
- Magic links como único método de autenticación para clientes