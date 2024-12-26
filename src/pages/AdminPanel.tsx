import { AdminLayout } from "@/components/admin/AdminLayout"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { AdminOrders } from "@/components/admin/AdminOrders"
import { AdminCustomers } from "@/components/admin/AdminCustomers"
import { AdminProducts } from "@/components/admin/AdminProducts"
import { AdminEmails } from "@/components/admin/AdminEmails"
import { AdminSettings } from "@/components/admin/AdminSettings"
import { Routes, Route } from "react-router-dom"

export default function AdminPanel() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="emails" element={<AdminEmails />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  )
}