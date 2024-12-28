import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main className="container mx-auto py-16 px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <CheckCircle2 className="h-24 w-24 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900">
            ¡Gracias por tu compra!
          </h1>
          
          <p className="text-xl text-gray-600">
            Tu pedido ha sido procesado exitosamente. Recibirás un correo electrónico con los detalles de tu compra.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-lg font-semibold mb-4">Próximos pasos:</h2>
            <ul className="text-left space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Revisa tu correo electrónico para ver la confirmación del pedido
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Sigue las instrucciones de activación que te enviamos
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Si tienes alguna pregunta, no dudes en contactarnos
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <Link to="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}