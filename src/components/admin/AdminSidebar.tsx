import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Mail,
  Settings
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
    path: "/paneladmin",
    icon: LayoutDashboard,
  },
  {
    title: "Pedidos",
    path: "/paneladmin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Clientes",
    path: "/paneladmin/customers",
    icon: Users,
  },
  {
    title: "Productos",
    path: "/paneladmin/products",
    icon: Package,
  },
  {
    title: "Emails",
    path: "/paneladmin/emails",
    icon: Mail,
  },
  {
    title: "Configuración",
    path: "/paneladmin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Panel de Administración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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