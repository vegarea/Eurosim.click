# Tabla: Workflow Events

Esta tabla registra eventos y cambios en los flujos de trabajo.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del evento | ✅ |
| workflow_id | uuid | ID del flujo relacionado | ✅ |
| type | enum | Tipo de evento (status_change/note/error) | ✅ |
| description | text | Descripción del evento | ✅ |
| metadata | jsonb | Datos adicionales del evento | ❌ |
| user_id | uuid | ID del usuario que generó el evento | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `workflow_id` para búsqueda rápida
3. Índice en `type` para filtrado
4. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todos los eventos
- Dev: Puede ver eventos relacionados
- Sistema: Puede leer para procesamiento

### Escritura
- Admin: Puede crear eventos
- Dev: Puede crear eventos
- Sistema: Puede crear eventos automáticos

## Relaciones

- Se relaciona con `workflows` a través de `workflow_id`
- Se relaciona con `users` a través de `user_id`

## Triggers

1. Notificación al equipo en eventos críticos
2. Registro en logs del sistema

## Notas Adicionales

- El campo `metadata` puede incluir:
  ```json
  {
    "old_status": "pending",
    "new_status": "working",
    "commit_hash": "abc123",
    "error_details": {
      "type": "build_error",
      "message": "..."
    }
  }
  ```
- Los eventos son inmutables una vez creados
- Sirven como audit log del sistema