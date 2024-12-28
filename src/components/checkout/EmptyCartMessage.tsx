import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export function EmptyCartMessage() {
  const navigate = useNavigate()

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
      <p className="text-gray-500 text-center mb-6">
        Parece que aún no has añadido ningún producto a tu carrito
      </p>
      <Button 
        onClick={() => navigate('/')}
        className="bg-primary hover:bg-primary/90"
      >
        Ir a la tienda
      </Button>
    </motion.div>
  )
}