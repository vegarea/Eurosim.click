# Seguridad del Checkout

## Estructura de Base de Datos
- Las tablas principales son: `orders`, `order_items`, `customers`
- Los tipos en `src/types/database/` reflejan exactamente esta estructura
- No modificar los tipos sin actualizar primero la base de datos

## Políticas RLS
- Todas las tablas del checkout deben tener políticas PERMISSIVE
- Configuradas para permitir operaciones de invitados
- No requieren autenticación para crear órdenes

## Flujo de Datos
1. Usuario añade productos al carrito (`CartContext`)
2. Completa formulario de checkout
3. Se procesa el pago
4. Solo después del pago exitoso:
   - Se crea el cliente
   - Se crea la orden
   - Se crean los items de la orden

## Puntos Críticos
- No modificar `CheckoutProcessor.ts` sin entender el flujo completo
- Mantener las políticas RLS como PERMISSIVE
- No añadir autenticación al proceso de checkout
- No crear registros en la base de datos antes de confirmar el pago

## Mantenimiento Seguro
1. Antes de modificar componentes:
   - Revisar que los tipos coincidan con Supabase
   - No añadir transformaciones de datos
   - Mantener la separación entre UI y lógica de negocio

2. Al añadir funcionalidades:
   - No modificar el flujo básico de checkout
   - Mantener el checkout sin autenticación
   - Respetar la estructura de archivos existente

3. Pruebas recomendadas:
   - Probar el checkout completo después de cada cambio
   - Verificar la creación correcta de registros
   - Confirmar que las políticas RLS siguen funcionando