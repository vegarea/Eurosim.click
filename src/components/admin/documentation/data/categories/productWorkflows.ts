import { WorkflowItem } from "../../types/WorkflowTypes"

export const productWorkflows: WorkflowItem[] = [
  {
    id: "FL-201",
    title: "Gestión básica de productos",
    description: "CRUD básico de productos (SIMs físicas y eSIMs)",
    status: "working",
    components: [
      "AdminProducts.tsx",
      "ProductCard.tsx",
      "AddProductDialog.tsx"
    ],
    database: [
      "products (tabla)"
    ],
    details: `
- Listado de productos implementado y funcionando
- Visualización de detalles en tarjetas
- Creación de nuevos productos con formulario
- Eliminación de productos
- Diferenciación entre SIMs físicas y eSIMs
- UI responsive completamente funcional`
  },
  {
    id: "FL-202",
    title: "Control de inventario SIMs físicas",
    description: "Gestión del stock de SIMs físicas",
    status: "reviewed",
    components: [
      "AdminProducts.tsx",
      "ProductCard.tsx"
    ],
    database: [
      "products (tabla) - campo stock"
    ],
    details: `
- UI para visualización de stock implementada
- Componentes para gestión de inventario listos
- Pendiente: Conexión con Supabase para:
  * Actualización en tiempo real del stock
  * Alertas de stock bajo
  * Sincronización con pedidos`
  },
  {
    id: "FL-203",
    title: "Gestión de precios y características",
    description: "Administración de precios y características de productos",
    status: "working",
    components: [
      "AddProductDialog.tsx",
      "ProductCard.tsx"
    ],
    database: [
      "products (tabla) - campos price, features, europeGB, spainGB"
    ],
    details: `
- Configuración de precios implementada
- Gestión de GB en Europa y España funcionando
- Listado de características por producto
- Validación de datos al crear/editar
- UI completa y funcional`
  },
  {
    id: "FL-204",
    title: "Categorización de productos",
    description: "Sistema de categorías y filtros",
    status: "working",
    components: [
      "AdminProducts.tsx",
      "ProductCard.tsx"
    ],
    details: `
- Filtrado por tipo de producto (eSIM/física)
- Sistema de categorización implementado
- UI de filtros funcionando correctamente`
  },
  {
    id: "FL-205",
    title: "Gestión de imágenes",
    description: "Sistema de gestión de imágenes de productos",
    status: "reviewed",
    components: [
      "ProductCard.tsx",
      "AddProductDialog.tsx"
    ],
    details: `
- UI para carga de imágenes implementada
- Previsualización de imágenes funcionando
- Pendiente: Conexión con Supabase Storage para:
  * Almacenamiento de imágenes
  * CDN y optimización
  * Gestión de versiones`
  }
]