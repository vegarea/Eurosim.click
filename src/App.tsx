import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Sims from "./pages/Sims"
import ESims from "./pages/ESims"
import Checkout from "./pages/Checkout"
import ThankYou from "./pages/ThankYou"
import AdminPanel from "./pages/AdminPanel"
import OrderDetails from "./pages/OrderDetails"
import { CartProvider } from "./contexts/CartContext"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sims" element={<Sims />} />
          <Route path="/e-sims" element={<ESims />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/orders/:id" element={<OrderDetails />} />
        </Routes>
        <Toaster />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App