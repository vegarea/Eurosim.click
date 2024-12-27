# Tabla: Workflows

Esta tabla almacena la información de los flujos de trabajo y su estado de implementación.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del flujo | ✅ |
| category_id | uuid | ID de la categoría del flujo | ✅ |
| title | text | Título del flujo de trabajo | ✅ |
| description | text | Descripción detallada | ✅ |
| status | enum | Estado (working/pending/error) | ✅ |
| components | text[] | Lista de componentes relacionados | ❌ |
| database_tables | text[] | Lista de tablas de base de datos relacionadas | ❌ |
| details | text | Detalles técnicos y notas | ❌ |
| metadata | jsonb | Información adicional flexible | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `category_id` para agrupación
3. Índice en `status` para filtrado rápido
4. Índice en `created_at` para ordenamiento cronológico

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todos los flujos
- Dev: Puede ver todos los flujos
- Sistema: Puede leer para actualizaciones automáticas

### Escritura
- Admin: Puede crear y actualizar flujos
- Dev: Puede actualizar estado y detalles
- Sistema: Puede actualizar estados automáticamente

## Relaciones

- Se relaciona con `workflow_categories` a través de `category_id`
- Puede tener múltiples eventos en `workflow_events`
- Puede tener múltiples notas en `workflow_notes`

## Triggers

1. Actualización automática de `updated_at`
2. Creación de evento en `workflow_events` al cambiar el estado
3. Notificación al equipo cuando cambia el estado a error

## Notas Adicionales

- Los componentes y tablas se almacenan como arrays para facilitar búsquedas
- El campo `metadata` puede incluir información específica del flujo como:
  ```json
  {
    "priority": "high",
    "estimated_hours": 40,
    "dependencies": ["FL-101", "FL-102"],
    "technical_docs": "url_to_docs"
  }
  ```
- Los estados siguen un flujo específico y tienen significados concretos:
  - working: Implementado y funcionando
  - pending: Pendiente de implementación
  - error: Problemas detectados