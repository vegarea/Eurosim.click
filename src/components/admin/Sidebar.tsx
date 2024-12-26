import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  BarChart, 
  Mail, 
  Settings 
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: ShoppingCart, label: "Pedidos", path: "/admin/orders" },
  { icon: Users, label: "Clientes", path: "/admin/customers" },
  { icon: Package, label: "Productos", path: "/admin/products" },
  { icon: BarChart, label: "Estadísticas", path: "/admin/stats" },
  { icon: Mail, label: "Emails", path: "/admin/emails" },
  { icon: Settings, label: "Ajustes", path: "/admin/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                ? "bg-primary/10 text-primary border-r-2 border-primary"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};