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

  // Filtrar los GB de Europa de las características
  const filteredFeatures = features.filter(feature => !feature.includes('GB datos en toda Europa'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/50 backdrop-blur-sm p-3 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary flex items-baseline gap-1 justify-end">
            {amount}
            <span className="text-sm font-normal text-gray-500">{currency}</span>
          </p>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-lg font-semibold text-primary">{europeGB}GB</span>
            <span className="text-sm text-gray-600">en toda Europa</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
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

      <UsageMeter
        europeGB={europeGB}
        spainGB={spainGB}
        isHighlighted={true}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3"
      >
        <Button 
          onClick={handlePurchase}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary/20 gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Comprar
        </Button>
      </motion.div>
    </motion.div>
  );
}