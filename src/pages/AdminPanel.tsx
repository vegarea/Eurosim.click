import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
import { AdminDocumentation } from "@/components/admin/documentation/AdminDocumentation"
import { Routes, Route } from "react-router-dom"
import { OrdersProvider } from "@/contexts/OrdersContext"
import { supabase } from "@/integrations/supabase/client"

export default function AdminPanel() {
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate("/auth")
      }
    }

    checkAuth()

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth")
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <OrdersProvider>
      <AdminLayout>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="physical-shipping" element={<AdminPhysicalShipping />} />
          <Route path="esim-delivery" element={<AdminESimDelivery />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="emails" element={<AdminEmails />} />
          <Route path="documentation" element={<AdminDocumentation />} />
          <Route path="settings" element={<AdminSettings />} />
        </Routes>
      </AdminLayout>
    </OrdersProvider>
  )
}