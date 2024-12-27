# Tabla: Email Templates

Esta tabla almacena las plantillas de correo electrónico utilizadas para comunicaciones automáticas con los clientes.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único de la plantilla | ✅ |
| name | text | Nombre identificativo de la plantilla | ✅ |
| subject | text | Asunto del correo | ✅ |
| content | text | Contenido HTML del correo | ✅ |
| description | text | Descripción interna de la plantilla | ✅ |
| type | enum | Tipo de producto (physical/esim/both) | ✅ |
| status | enum | Estado del pedido relacionado (payment_pending/processing/shipped/delivered/cancelled) | ✅ |
| variables | jsonb | Variables disponibles para la plantilla | ✅ |
| carrier_id | text | ID de la empresa de envío (solo para plantillas de envío) | ❌ |
| is_active | boolean | Si la plantilla está activa | ✅ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| created_by | uuid | ID del usuario que creó la plantilla | ✅ |
| updated_by | uuid | ID del usuario que actualizó la plantilla | ✅ |

## Índices

1. Índice primario en `id`
2. Índice en `type` para filtrado por tipo de producto
3. Índice en `status` para filtrado por estado
4. Índice en `carrier_id` para búsqueda por empresa de envío
5. Índice en `is_active` para filtrado de plantillas activas

## Políticas de Seguridad (RLS)

### Lectura
- Admin: Puede ver todas las plantillas
- Sistema: Puede leer plantillas para envío automático

### Escritura
- Admin: Puede crear y modificar plantillas
- Sistema: No puede modificar plantillas

## Variables Predefinidas

### Variables Generales
```json
{
  "nombre_cliente": "Nombre del cliente",
  "numero_pedido": "Número de referencia del pedido",
  "fecha_pedido": "Fecha de realización del pedido",
  "total": "Monto total del pedido",
  "moneda": "Moneda del pedido"
}
```

### Variables para SIM Física
```json
{
  "numero_tracking": "Número de seguimiento",
  "empresa_envio": "Nombre de la empresa de envío",
  "url_tracking": "URL de seguimiento del envío",
  "direccion_envio": "Dirección de entrega completa",
  "fecha_estimada": "Fecha estimada de entrega"
}
```

### Variables para E-SIM
```json
{
  "codigo_activacion": "Código de activación de la E-SIM",
  "qr_code": "Código QR para activación",
  "fecha_activacion": "Fecha de activación programada",
  "instrucciones_activacion": "Instrucciones específicas de activación"
}
```

## Empresas de Envío Soportadas

| ID | Nombre | Variables Adicionales |
|----|--------|---------------------|
| redpack | Redpack | tracking_url_format |
| estafeta | Estafeta | tracking_url_format |
| fedex | FedEx | tracking_url_format |
| dhl | DHL | tracking_url_format |
| ups | UPS | tracking_url_format |

## Triggers

1. Actualización automática de `updated_at`
2. Validación de variables requeridas según tipo
3. Validación de formato HTML en contenido
4. Registro de cambios en tabla de auditoría

## Notas Adicionales

- El campo `variables` contiene un objeto JSON con las variables disponibles y sus descripciones
- El contenido HTML debe ser válido y responsive
- Las plantillas pueden incluir estilos inline o referenciar estilos predefinidos
- Se recomienda probar las plantillas antes de activarlas
- Las variables se reemplazan automáticamente al enviar el correo
- Las plantillas específicas de empresas de envío heredan todas las variables generales

## Ejemplo de Estructura variables

```json
{
  "required": ["nombre_cliente", "numero_pedido"],
  "optional": ["tracking_number", "carrier_name"],
  "descriptions": {
    "nombre_cliente": "Nombre completo del cliente",
    "numero_pedido": "Número de referencia del pedido",
    "tracking_number": "Número de seguimiento del envío",
    "carrier_name": "Nombre de la empresa de envío"
  }
}
```

## Auditoría

Se mantiene un registro de cambios en la tabla `email_template_changes` que incluye:
- Quién realizó el cambio
- Qué campos se modificaron
- Valores anteriores y nuevos
- Fecha y hora del cambio
- IP desde donde se realizó el cambio