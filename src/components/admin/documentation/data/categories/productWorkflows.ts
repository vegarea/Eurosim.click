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
- Listado de productos
- Visualización de detalles
- Creación de nuevos productos
- Eliminación de productos
- Diferenciación entre SIMs físicas y eSIMs`
  },
  {
    id: "FL-202",
    title: "Control de inventario SIMs físicas",
    description: "Gestión del stock de SIMs físicas",
    status: "pending",
    components: [
      "AdminProducts.tsx",
      "ProductCard.tsx"
    ],
    database: [
      "products (tabla) - campo stock"
    ],
    details: `
- Seguimiento de stock disponible
- Alertas de stock bajo
- Actualización automática al procesar pedidos`
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
- Configuración de precios
- Gestión de GB en Europa y España
- Listado de características por producto
- Validación de datos al crear/editar`
  }
]