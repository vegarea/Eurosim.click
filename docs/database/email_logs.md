# Tabla: Email Logs

Esta tabla registra todos los emails enviados por el sistema.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del log | ✅ |
| template_id | uuid | ID de la plantilla usada | ✅ |
| recipient | text | Email del destinatario | ✅ |
| subject | text | Asunto del email | ✅ |
| status | text | Estado del envío | ✅ |
| error | text | Mensaje de error si falló | ❌ |
| metadata | jsonb | Información adicional | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `template_id` para análisis
3. Índice en `recipient` para búsqueda
4. Índice en `status` para monitoreo
5. Índice en `created_at` para ordenamiento

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todos los logs
- Sistema: Puede leer para procesamiento
- Cliente: No tiene acceso

### Escritura
- Sistema: Registra envíos automáticamente
- Admin: No puede escribir directamente

## Estados de Envío

- queued: En cola
- sending: Enviando
- sent: Enviado
- failed: Fallido
- bounced: Rebotado

## Relaciones

- Se relaciona con `email_templates` a través de `template_id`