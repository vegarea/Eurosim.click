# Tabla: Document Validations

Esta tabla registra el historial de validaciones de documentos.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único de la validación | ✅ |
| document_id | uuid | ID del documento | ✅ |
| validator_id | uuid | ID del validador (usuario o sistema) | ✅ |
| status | text | Resultado de la validación | ✅ |
| notes | text | Notas de la validación | ❌ |
| metadata | jsonb | Información adicional | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `document_id` para búsqueda
3. Índice en `validator_id` para auditoría
4. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todas las validaciones
- Sistema: Puede leer para procesamiento
- Cliente: No tiene acceso directo

### Escritura
- Sistema: Registra validaciones automáticas
- Admin: Puede crear validaciones manuales
- Cliente: No puede escribir

## Estados de Validación

- passed: Validación exitosa
- failed: Validación fallida
- needs_review: Requiere revisión manual
- expired: Documento expirado

## Tipos de Validación

- automatic: Validación automática
- manual: Validación por personal
- third_party: Validación por servicio externo