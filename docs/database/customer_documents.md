# Tabla: Customer Documents

Esta tabla almacena los documentos de identificación de los clientes.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del documento | ✅ |
| customer_id | uuid | ID del cliente | ✅ |
| type | text | Tipo de documento | ✅ |
| number | text | Número del documento | ✅ |
| expiry_date | date | Fecha de expiración | ✅ |
| country | text | País de emisión | ✅ |
| status | text | Estado de validación | ✅ |
| metadata | jsonb | Información adicional | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `customer_id` para búsqueda
3. Índice en `type` para filtrado
4. Índice en `status` para filtrado
5. Índice en `number` para búsqueda

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver sus propios documentos
- Admin: Puede ver todos los documentos
- Sistema: Puede leer para validación

### Escritura
- Cliente: Puede subir documentos
- Admin: Puede actualizar estado
- Sistema: Puede actualizar mediante validación automática

## Estados de Validación

- pending: Pendiente de revisión
- validating: En proceso de validación
- approved: Aprobado
- rejected: Rechazado
- expired: Expirado

## Tipos de Documentos

- passport: Pasaporte
- national_id: Documento nacional
- drivers_license: Licencia de conducir