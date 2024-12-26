import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Mail,
  Settings,
  Truck,
  QrCode
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Pedidos",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Envíos Físicos",
    path: "/admin/physical-shipping",
    icon: Truck,
  },
  {
    title: "Envíos E-SIM",
    path: "/admin/esim-delivery",
    icon: QrCode,
  },
  {
    title: "Clientes",
    path: "/admin/customers",
    icon: Users,
  },
  {
    title: "Productos",
    path: "/admin/products",
    icon: Package,
  },
  {
    title: "Emails",
    path: "/admin/emails",
    icon: Mail,
  },
  {
    title: "Configuración",
    path: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-b from-brand-500 to-brand-600">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/90">Panel de Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className="text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}