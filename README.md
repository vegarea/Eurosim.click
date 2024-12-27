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

### Customers

Tabla para almacenar la información de los clientes.

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único | ✅ |
| name | text | Nombre completo | ✅ |
| email | text | Correo electrónico | ✅ |
| phone | text | Teléfono | ❌ |
| status | enum | Estado del cliente ('active', 'inactive') | ✅ |

#### Documentación UE
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| passport_number | text | Número de pasaporte | ❌ |
| birth_date | date | Fecha de nacimiento | ❌ |
| gender | enum | Género ('M' o 'F') | ❌ |

#### Dirección de Envío
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| shipping_address | text | Dirección completa | ❌ |
| city | text | Ciudad | ❌ |
| state | text | Estado/Provincia | ❌ |
| zip_code | text | Código postal | ❌ |

#### Metadatos
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| last_order_date | timestamp | Fecha del último pedido | ❌ |
| total_orders | integer | Número total de pedidos | ❌ |
| total_spent | decimal | Monto total gastado | ❌ |
| metadata | jsonb | Información adicional en formato JSON | ❌ |

#### Índices
- `id` (Primary Key)
- `email` (Unique)
- `status` (Para filtrado rápido)
- `created_at` (Para ordenamiento)

#### Políticas de Seguridad (RLS)
- Lectura: Cliente solo puede ver su propia información
- Escritura: Cliente solo puede actualizar su propia información
- Administradores tienen acceso completo

#### Relaciones
- `orders` - One-to-Many (un cliente puede tener múltiples pedidos)

### Blog Posts

Tabla para almacenar los artículos del blog.

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único | ✅ |
| title | text | Título del artículo | ✅ |
| content | text | Contenido en formato HTML | ✅ |
| slug | text | URL amigable (unique) | ✅ |
| status | enum | Estado ('draft', 'published', 'archived') | ✅ |
| published_at | timestamp | Fecha de publicación | ❌ |
| author_id | uuid | ID del autor (foreign key) | ✅ |
| featured_image | text | URL de la imagen destacada | ❌ |
| meta_description | text | Descripción para SEO | ✅ |
| views_count | integer | Contador de vistas | ✅ |

#### SEO y Social
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| meta_title | text | Título para SEO | ❌ |
| meta_keywords | text[] | Keywords para SEO | ❌ |
| og_image | text | Imagen para compartir en redes | ❌ |
| og_description | text | Descripción para redes sociales | ❌ |

#### Generación AI
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| ai_prompt | text | Prompt usado para generar | ❌ |
| ai_model | text | Modelo de AI usado | ❌ |
| ai_generated | boolean | Si fue generado por AI | ✅ |
| ai_review_status | enum | Estado de revisión ('pending', 'reviewed', 'approved') | ❌ |
| ai_metadata | jsonb | Datos adicionales del proceso AI | ❌ |

#### Metadatos
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| metadata | jsonb | Información adicional | ❌ |

#### Índices
- `id` (Primary Key)
- `slug` (Unique)
- `status, published_at` (Para listados)
- `author_id` (Foreign Key)

#### Políticas de Seguridad (RLS)
- Lectura: Pública para posts publicados
- Escritura: Solo administradores
- Borrado: Solo administradores

### Blog Post Images

Tabla para almacenar las imágenes dentro del contenido de los artículos.

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único | ✅ |
| post_id | uuid | ID del artículo (foreign key) | ✅ |
| url | text | URL de la imagen | ✅ |
| alt_text | text | Texto alternativo | ✅ |
| caption | text | Pie de foto | ❌ |
| width | integer | Ancho de la imagen | ✅ |
| height | integer | Alto de la imagen | ✅ |
| position | integer | Orden en el artículo | ❌ |
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |

#### Índices
- `id` (Primary Key)
- `post_id` (Foreign Key)
- `position` (Para ordenamiento)

#### Políticas de Seguridad (RLS)
- Lectura: Pública
- Escritura: Solo administradores
- Borrado: Solo administradores

### Email Templates

Tabla para almacenar las plantillas de email.

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| id | uuid | Identificador único | ✅ |
| name | text | Nombre de la plantilla | ✅ |
| subject | text | Asunto del email | ✅ |
| content | text | Contenido HTML del email | ✅ |
| description | text | Descripción de uso | ✅ |
| status | enum | Estado ('active', 'inactive') | ✅ |
| type | enum | Tipo ('physical', 'esim', 'both') | ✅ |

#### Configuración
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| variables | jsonb | Variables disponibles | ✅ |
| carrier_specific | boolean | Si es específico para transportista | ✅ |
| carrier_id | text | ID del transportista si aplica | ❌ |
| order_status | enum | Estado del pedido relacionado | ✅ |
| language | text | Idioma de la plantilla | ✅ |

#### Seguimiento
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| last_used | timestamp | Última vez usada | ❌ |
| usage_count | integer | Veces utilizada | ❌ |
| success_rate | decimal | Tasa de éxito de envío | ❌ |

#### Metadatos
| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| created_at | timestamp | Fecha de creación | ✅ |
| updated_at | timestamp | Fecha de última actualización | ✅ |
| created_by | uuid | Usuario que la creó | ✅ |
| updated_by | uuid | Último usuario que la modificó | ✅ |
| metadata | jsonb | Información adicional | ❌ |

#### Índices
- `id` (Primary Key)
- `type, status` (Para filtrado)
- `carrier_id` (Para filtrado por transportista)
- `order_status` (Para búsqueda rápida)

#### Políticas de Seguridad (RLS)
- Lectura: Solo administradores
- Escritura: Solo administradores
- Activación/Desactivación: Solo administradores