import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Checkout from "./pages/Checkout"
import ThankYou from "./pages/ThankYou"
import Sims from "./pages/Sims"
import ESims from "./pages/ESims"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CartProvider } from "@/contexts/CartContext"

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/sims" element={<Sims />} />
          <Route path="/e-sims" element={<ESims />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  )
}

export default App