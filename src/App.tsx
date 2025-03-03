
import React, { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext"
import { OrdersProvider } from "./contexts/OrdersContext"
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute"
import { supabase } from "@/integrations/supabase/client"
import Index from "./pages/Index"
import Sims from "./pages/Sims"
import ESims from "./pages/ESims"
import Checkout from "./pages/Checkout"
import ThankYou from "./pages/ThankYou"
import AdminPanel from "./pages/AdminPanel"
import OrderDetails from "./pages/OrderDetails"
import Login from "./pages/Login"
import Contact from "./pages/Contact"
import HowItWorks from "./pages/HowItWorks"
import FAQ from "./pages/FAQ"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import Blog from "./pages/Blog"
import BlogPost from "./pages/BlogPost"
import "flag-icons/css/flag-icons.min.css"

const queryClient = new QueryClient()

interface TrackingScripts {
  google_analytics?: string;
  facebook_pixel?: string;
  other_scripts?: string;
}

const AppContent = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .maybeSingle()
      
      if (error) throw error
      return data
    }
  })

  const trackingScripts = (siteSettings?.tracking_scripts || {}) as TrackingScripts

  // Cargar Google Analytics dinámicamente
  const loadGoogleAnalytics = (gaId: string) => {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    // Usamos la función gtag definida globalmente y no redefinimos el tipo
    window.gtag('js', new Date().toISOString())
    window.gtag('config', gaId)
  }

  // Cargar GA cuando tengamos el ID
  useEffect(() => {
    if (trackingScripts.google_analytics) {
      const gaId = trackingScripts.google_analytics
      loadGoogleAnalytics(gaId)
    }
  }, [trackingScripts.google_analytics])

  return (
    <>
      <TooltipProvider>
        <CartProvider>
          <OrdersProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sims" element={<Sims />} />
                <Route path="/e-sims" element={<ESims />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/como-funciona" element={<HowItWorks />} />
                <Route path="/preguntas-frecuentes" element={<FAQ />} />
                <Route path="/privacidad" element={<Privacy />} />
                <Route path="/terminos" element={<Terms />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedAdminRoute>
                      <AdminPanel />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/orders/:orderId"
                  element={
                    <ProtectedAdminRoute>
                      <OrderDetails />
                    </ProtectedAdminRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </OrdersProvider>
        </CartProvider>
      </TooltipProvider>
    </>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
)

export default App
