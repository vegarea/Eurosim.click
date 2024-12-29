import { useEffect, useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PartyPopper, CheckCircle, Receipt, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Order } from "@/types/database/orders"

interface ExtendedOrder extends Order {
  customers?: {
    name: string | null;
    email: string | null;
  } | null;
}

export default function ThankYou() {
  const [searchParams] = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<ExtendedOrder | null>(null)
  const { toast } = useToast()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data: order, error } = await supabase
          .from("orders")
          .select(`
            *,
            customers (
              name,
              email
            )
          `)
          .eq("stripe_payment_intent_id", sessionId)
          .single()

        if (error) throw error
        setOrderDetails(order)
      } catch (error) {
        console.error("Error fetching order details:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "No pudimos obtener los detalles de tu pedido"
        })
      }
    }

    if (sessionId) {
      fetchOrderDetails()
    }
  }, [sessionId, toast])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <PartyPopper className="h-16 w-16 text-primary" />
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¡Gracias por tu compra{orderDetails?.customers?.name ? `, ${orderDetails.customers.name}` : ""}!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tu pedido ha sido confirmado y está siendo procesado
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
          >
            <div className="flex items-center justify-center mb-4 text-green-500">
              <CheckCircle className="h-8 w-8" />
            </div>
            <p className="text-gray-600 mb-4">
              Te hemos enviado un correo de confirmación a{" "}
              <span className="font-semibold">
                {orderDetails?.customers?.email}
              </span>
            </p>
            {orderDetails?.stripe_receipt_url && (
              <a
                href={orderDetails.stripe_receipt_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80"
              >
                <Receipt className="h-4 w-4 mr-2" />
                Ver recibo
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}