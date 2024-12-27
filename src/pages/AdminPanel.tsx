import { AdminLayout } from "@/components/admin/AdminLayout"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { AdminOrders } from "@/components/admin/AdminOrders"
import { AdminCustomers } from "@/components/admin/AdminCustomers"
import { AdminProducts } from "@/components/admin/AdminProducts"
import { AdminEmails } from "@/components/admin/AdminEmails"
import { AdminSettings } from "@/components/admin/AdminSettings"
import { AdminPhysicalShipping } from "@/components/admin/shipping/AdminPhysicalShipping"
import { AdminESimDelivery } from "@/components/admin/shipping/AdminESimDelivery"
import { Routes, Route } from "react-router-dom"
import { OrdersProvider } from "@/contexts/OrdersContext"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function AdminPanel() {
  return (
    <OrdersProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AdminLayout>
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="physical-shipping" element={<AdminPhysicalShipping />} />
              <Route path="esim-delivery" element={<AdminESimDelivery />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="emails" element={<AdminEmails />} />
              <Route path="settings" element={<AdminSettings />} />
            </Routes>
          </AdminLayout>
        </div>
      </SidebarProvider>
    </OrdersProvider>
  )
}