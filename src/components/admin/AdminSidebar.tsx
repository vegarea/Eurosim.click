import { Link } from "react-router-dom"
import { Calendar } from "lucide-react"

export function AdminSidebar() {
  return (
    <nav className="space-y-2">
      <Link
        to="/admin/dashboard"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        to="/admin/blog"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Blog
      </Link>
      <Link
        to="/admin/orders"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Pedidos
      </Link>
      <Link
        to="/admin/physical-shipping"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Envío Físico
      </Link>
      <Link
        to="/admin/esim-delivery"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Entrega eSIM
      </Link>
      <Link
        to="/admin/activations"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Activaciones
      </Link>
      <Link
        to="/admin/customers"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Clientes
      </Link>
      <Link
        to="/admin/products"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Productos
      </Link>
      <Link
        to="/admin/emails"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Emails
      </Link>
      <Link
        to="/admin/settings"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <Calendar className="h-4 w-4" />
        Configuración
      </Link>
    </nav>
  )
}
