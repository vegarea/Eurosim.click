import { motion } from "framer-motion";
import { UsageMeter } from "@/components/UsageMeter";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/currency";

interface PlanDetailsProps {
  title: string;
  description: string;
  features: string[];
  europeGB: number;
  spainGB: number;
  price: number;
}

export function PlanDetails({ 
  title, 
  description, 
  features, 
  europeGB, 
  spainGB,
  price 
}: PlanDetailsProps) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handlePurchase = () => {
    addItem({
      id: `esim-${title}`,
      type: "esim",
      title,
      description,
      price
    });
    
    toast({
      title: "Producto añadido al carrito",
      description: `Has seleccionado el plan ${title}`,
    });
    
    navigate('/checkout');
  };

  const [amount, currency] = formatCurrency(price).split(' ');
  const filteredFeatures = features.filter(feature => !feature.includes('GB datos en toda Europa'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
    >
      {/* Encabezado destacado con precio y GB */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="text-right">
            <p className="text-4xl font-bold text-primary flex items-baseline gap-1 justify-end">
              {amount}
              <span className="text-sm font-normal text-gray-500">{currency}</span>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/80 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary">{europeGB}GB</p>
            <p className="text-sm text-gray-600">Europa</p>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary">{spainGB}GB</p>
            <p className="text-sm text-gray-600">España</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 space-y-6">
        {/* Características */}
        <div className="space-y-2">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <span className="text-sm text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Medidor de uso */}
        <UsageMeter
          europeGB={europeGB}
          spainGB={spainGB}
          isHighlighted={true}
        />

        {/* Botón de compra */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary/20 gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Comprar
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}