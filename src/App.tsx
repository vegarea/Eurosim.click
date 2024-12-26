import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Checkout from "@/pages/Checkout";
import Admin from "@/pages/Admin";
import Sims from "@/pages/Sims";
import ESims from "@/pages/ESims";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/sims" element={<Sims />} />
        <Route path="/e-sims" element={<ESims />} />
      </Routes>
    </Router>
  );
}

export default App;