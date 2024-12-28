# Flujo de Pago y Registro de Datos

## Principios Fundamentales

1. Compra sin registro de usuario
2. No se crean registros hasta confirmación de Stripe
3. El flujo es controlado por webhooks

## Flujo Detallado

### 1. Proceso de Compra
- Usuario selecciona productos
- Completa formulario de documentación
- Completa información de contacto/envío
- Es redirigido a Stripe
- **Importante**: Ningún dato se guarda en este punto

### 2. Proceso en Stripe
- Usuario completa/cancela el pago en Stripe
- Stripe envía webhook con el resultado
- **Importante**: Solo los webhooks de Stripe pueden crear registros

### 3. Webhooks de Stripe

#### Pago Exitoso (payment_intent.succeeded)
1. Se crea el registro del cliente
2. Se crea la orden
3. Se registra el pago
4. Se envía email de confirmación

#### Pago Fallido (payment_intent.payment_failed)
1. Se registra el intento fallido en payment_logs
2. No se crea ningún otro registro

## Tablas Afectadas

### customers
- Solo se crea después de pago exitoso
- Datos del formulario de documentación
- Información de contacto

### orders
- Solo se crea después de pago exitoso
- Vinculada al cliente creado
- Incluye detalles del producto y envío

### order_events
- Registra eventos post-creación
- Incluye cambios de estado
- Tracking de envío (si aplica)

### payment_logs
- Registra todos los eventos de pago
- Incluye intentos fallidos
- Guarda metadata de Stripe

## Notas Importantes

1. Seguridad
   - No se almacenan datos sensibles antes de la confirmación
   - Stripe maneja toda la información de pago
   - Los webhooks deben ser verificados

2. Experiencia de Usuario
   - Proceso sin fricción para el cliente
   - No requiere crear cuenta
   - Confirmación inmediata post-pago

3. Integridad de Datos
   - Sin registros parciales/incompletos
   - Datos consistentes
   - Trazabilidad completa vía logs