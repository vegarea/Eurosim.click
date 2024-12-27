# Tabla: Customers

Esta tabla almacena la información de los clientes registrados en la plataforma.

## Estructura

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único del cliente | ✅ |
| name | text | Nombre completo del cliente | ✅ |
| email | text | Correo electrónico | ✅ |
| phone | text | Número de teléfono | ❌ |
| passport_number | text | Número de pasaporte para documentación UE | ❌ |
| birth_date | date | Fecha de nacimiento | ❌ |
| gender | enum | Género (M/F) | ❌ |
| default_shipping_address | jsonb | Dirección de envío predeterminada | ❌ |
| billing_address | jsonb | Dirección de facturación | ❌ |
| preferred_language | text | Idioma preferido para comunicaciones | ❌ |
| marketing_preferences | jsonb | Preferencias de marketing y comunicación | ❌ |
| stripe_customer_id | text | ID del cliente en Stripe | ❌ |
| paypal_customer_id | text | ID del cliente en PayPal | ❌ |
| metadata | jsonb | Información adicional flexible | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

## Índices

1. Índice primario en `id`
2. Índice único en `email`
3. Índice en `phone` para búsquedas
4. Índice en `passport_number` para validaciones
5. Índice en `created_at` para ordenamiento cronológico

## Políticas de Seguridad (RLS)

### Lectura
- Cliente: Puede ver solo su propia información
- Admin: Puede ver todos los clientes
- Sistema: Puede leer información para procesamiento

### Escritura
- Cliente: Puede actualizar su propia información
- Admin: Puede crear y actualizar cualquier cliente
- Sistema: Puede actualizar metadatos y preferencias

## Relaciones

- Tiene múltiples pedidos en la tabla `orders`
- Puede tener múltiples direcciones en `customer_addresses`
- Puede tener múltiples documentos en `customer_documents`
- Se relaciona con `marketing_preferences` para comunicaciones

## Triggers

1. Actualización automática de `updated_at`
2. Validación de formato de email al insertar/actualizar
3. Validación de formato de teléfono
4. Notificación al equipo de soporte cuando se actualiza documentación UE
5. Sincronización con sistemas de marketing al actualizar preferencias

## Notas Adicionales

- El campo `default_shipping_address` es un objeto JSON con la estructura:
  ```json
  {
    "street": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "postal_code": "string",
    "phone": "string"
  }
  ```
- Las `marketing_preferences` incluyen:
  ```json
  {
    "email_marketing": boolean,
    "sms_marketing": boolean,
    "push_notifications": boolean,
    "language_preference": string,
    "communication_frequency": string
  }
  ```
- La documentación UE requiere validación especial del pasaporte y fecha de nacimiento
- Se mantiene un historial de cambios importantes en una tabla separada
- Los IDs de proveedores de pago (Stripe/PayPal) se utilizan para facilitar pagos recurrentes