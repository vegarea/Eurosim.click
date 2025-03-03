
import { AdminLayout } from "@/components/admin/AdminLayout"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { AdminOrders } from "@/components/admin/AdminOrders"
import { AdminCustomers } from "@/components/admin/AdminCustomers"
import { AdminProducts } from "@/components/admin/AdminProducts"
import { AdminEmails } from "@/components/admin/AdminEmails"
import { AdminSettings } from "@/components/admin/AdminSettings"
import { AdminBlog } from "@/components/admin/AdminBlog"
import { AdminPhysicalShipping } from "@/components/admin/shipping/AdminPhysicalShipping"
import { AdminESimDelivery } from "@/components/admin/shipping/AdminESimDelivery"
import { AdminActivations } from "@/components/admin/activations/AdminActivations"
import { AdminMessages } from "@/components/admin/AdminMessages"
import { Routes, Route } from "react-router-dom"
import { OrdersProvider } from "@/contexts/OrdersContext"

export default function AdminPanel() {
  return (
    <OrdersProvider>
      <AdminLayout>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="activations" element={<AdminActivations />} />
          <Route path="physical-shipping" element={<AdminPhysicalShipping />} />
          <Route path="esim-delivery" element={<AdminESimDelivery />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="emails" element={<AdminEmails />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </AdminLayout>
    </OrdersProvider>
  )
}
