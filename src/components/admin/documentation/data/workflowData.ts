import { WorkflowCategory } from "../types/WorkflowTypes"
import { authWorkflows } from "./categories/authWorkflows"
import { orderWorkflows } from "./categories/orderWorkflows"
import { productWorkflows } from "./categories/productWorkflows"
import { shippingWorkflows } from "./categories/shippingWorkflows"
import { blogWorkflows } from "./categories/blogWorkflows"
import { emailWorkflows } from "./categories/emailWorkflows"
import { settingsWorkflows } from "./categories/settingsWorkflows"
import { validationWorkflows } from "./categories/validationWorkflows"

export const workflowData: WorkflowCategory[] = [
  {
    id: "validation",
    title: "Validación y Verificación",
    items: validationWorkflows
  },
  {
    id: "auth",
    title: "Autenticación y Usuarios",
    items: authWorkflows
  },
  {
    id: "orders",
    title: "Gestión de Pedidos",
    items: orderWorkflows
  },
  {
    id: "products",
    title: "Gestión de Productos",
    items: productWorkflows
  },
  {
    id: "shipping",
    title: "Envíos y Entregas",
    items: shippingWorkflows
  },
  {
    id: "blog",
    title: "Blog y Contenido",
    items: blogWorkflows
  },
  {
    id: "emails",
    title: "Sistema de Emails",
    items: emailWorkflows
  },
  {
    id: "settings",
    title: "Configuración del Sistema",
    items: settingsWorkflows
  }
]
