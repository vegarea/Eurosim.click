import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Checkout from "./pages/Checkout"
import ThankYou from "./pages/ThankYou"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
