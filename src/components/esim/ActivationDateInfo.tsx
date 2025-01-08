import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

export function ActivationDateInfo() {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8 lg:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 lg:p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1.1, 1] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10"
          >
            <Calendar className="w-8 h-8 text-primary" />
          </motion.div>
          
          <div className="space-y-2">
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent`}>
              ¿Falta para tu viaje?
            </h3>
            <p className="text-gray-600">
              Compra tu SIM ahora y tus datos se activarán a partir de la fecha de inicio que nos indiques en tu compra.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}