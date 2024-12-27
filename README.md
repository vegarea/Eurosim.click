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

---
*Nota: Este documento se irá actualizando conforme se revisen y añadan más tablas.*
