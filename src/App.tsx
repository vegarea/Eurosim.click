import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Sims from "./pages/Sims"
import ESims from "./pages/ESims"
import Checkout from "./pages/Checkout"
import OrderDetails from "./pages/OrderDetails"
import AdminPanel from "./pages/AdminPanel"
import Auth from "./pages/Auth"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sims" element={<Sims />} />
        <Route path="/e-sims" element={<ESims />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App