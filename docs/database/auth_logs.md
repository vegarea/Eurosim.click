# Tabla: Auth Logs

Esta tabla registra todos los eventos de autenticación para auditoría y seguridad.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del log | ✅ |
| user_id | uuid | ID del usuario relacionado | ✅ |
| event_type | enum | Tipo de evento (magic_link_sent/magic_link_used/login/logout) | ✅ |
| ip_address | text | Dirección IP desde donde se realizó la acción | ✅ |
| user_agent | text | Información del navegador/dispositivo | ✅ |
| metadata | jsonb | Información adicional del evento | ❌ |
| created_at | timestamp | Fecha y hora del evento | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `user_id` para búsquedas rápidas
3. Índice en `event_type` para filtrado
4. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todos los logs
- Manager: Solo ve logs relacionados con sus acciones
- Cliente: No tiene acceso

### Escritura
- Sistema: Inserta logs automáticamente
- No se permiten modificaciones manuales

## Triggers
1. Validación de formato de IP
2. Limpieza automática de logs antiguos (retención de 6 meses)
3. Notificación al admin en casos de múltiples intentos fallidos

## Notas
- Los logs son inmutables una vez creados
- Se mantiene historial por razones de seguridad y auditoría
- Útil para detectar patrones de acceso sospechosos