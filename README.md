# Estructura de la Base de Datos

Este documento describe la estructura de las tablas en Supabase para el proyecto.

## Tablas

### Products

Tabla para almacenar los productos (SIMs físicas y eSIMs).

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único | ✅ |
| type | enum | Tipo de producto ('physical' o 'esim') | ✅ |
| title | text | Nombre del producto | ✅ |
| description | text | Descripción del producto | ✅ |
| price | decimal | Precio en centavos | ✅ |
| features | json | Array de características | ✅ |
| europe_gb | integer | GB disponibles en Europa | ❌ |
| spain_gb | integer | GB disponibles en España | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| status | enum | Estado del producto ('active' o 'inactive') | ✅ |
| stock | integer | Cantidad disponible (solo para SIMs físicas) | ❌ |
| metadata | jsonb | Información adicional en formato JSON | ❌ |

#### Índices
- `id` (Primary Key)
- `type` (Para filtrado rápido por tipo)
- `status` (Para filtrado por estado)

#### Políticas de Seguridad (RLS)
- Lectura: Pública para productos activos
- Escritura: Solo administradores

### Orders

Tabla para almacenar los pedidos de los clientes.

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único | ✅ |
| customer_id | uuid | ID del cliente | ✅ |
| status | enum | Estado del pedido ('payment_pending', 'processing', 'shipped', 'delivered', 'cancelled') | ✅ |
| type | enum | Tipo de pedido ('physical' o 'esim') | ✅ |
| total | decimal | Monto total en centavos | ✅ |
| payment_method | text | Método de pago utilizado | ✅ |
| payment_status | enum | Estado del pago ('pending', 'completed', 'failed') | ✅ |
| payment_url | text | URL de confirmación del pago (Stripe/PayPal) | ❌ |
| created_at | timestamp | Fecha y hora de creación | ✅ |
| updated_at | timestamp | Fecha y hora de última actualización | ✅ |

#### Información del Cliente
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| customer_name | text | Nombre completo del cliente | ✅ |
| email | text | Email del cliente | ✅ |
| phone | text | Teléfono del cliente | ❌ |

#### Información de Envío (Solo para SIMs físicas)
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| shipping_address | text | Dirección de envío | Condicional |
| city | text | Ciudad | Condicional |
| state | text | Estado/Provincia | Condicional |
| zip_code | text | Código postal | Condicional |

#### Documentación UE
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| passport_number | text | Número de pasaporte | ✅ |
| birth_date | date | Fecha de nacimiento | ✅ |
| gender | enum | Género ('M' o 'F') | ✅ |
| activation_date | date | Fecha de activación | ✅ |

#### Notas y Eventos
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| notes | jsonb | Array de notas sobre el pedido | ❌ |
| events | jsonb | Historial de eventos del pedido | ❌ |

#### Índices
- `id` (Primary Key)
- `customer_id` (Para búsqueda por cliente)
- `status` (Para filtrado por estado)
- `created_at` (Para ordenamiento y búsqueda por fecha)

#### Políticas de Seguridad (RLS)
- Lectura: Cliente solo ve sus propios pedidos
- Escritura: Solo administradores pueden crear/modificar pedidos
- Actualización de estado: Solo administradores

---
*Nota: Este documento se irá actualizando conforme se revisen y añadan más tablas.*