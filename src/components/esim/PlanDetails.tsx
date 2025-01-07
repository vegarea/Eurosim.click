import { motion } from "framer-motion";
import { UsageMeter } from "@/components/UsageMeter";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/currency";
import { Product } from "@/types/database/products";

interface PlanDetailsProps {
  product: Product;
}

export function PlanDetails({ product }: PlanDetailsProps) {
  const { toast } = useToast();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handlePurchase = () => {
    addItem(product);
    
    toast({
      title: "Producto añadido al carrito",
      description: `Has seleccionado el plan ${product.title}`,
    });
    
    navigate('/checkout');
  };

  const [amount, currency] = formatCurrency(product.price).split(' ');
  const features = product.features as string[] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {product.title}
            </h2>
            <p className="text-2xl font-bold text-primary flex items-baseline gap-1">
              {amount}
              <span className="text-sm font-normal text-gray-500">{currency}</span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/80 rounded-lg p-1.5">
              <p className="text-lg font-bold text-primary">{product.data_eu_gb}GB</p>
              <p className="text-xs text-gray-600">Europa</p>
            </div>
            <div className="bg-white/80 rounded-lg p-1.5">
              <p className="text-lg font-bold text-primary">{product.data_es_gb}GB</p>
              <p className="text-xs text-gray-600">España</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3">
        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-1">
            {features.slice(0, Math.ceil(features.length / 2)).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-1.5"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <span className="text-xs text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
          <div className="space-y-1">
            {features.slice(Math.ceil(features.length / 2)).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-1.5"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                <span className="text-xs text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <UsageMeter
          europeGB={product.data_eu_gb}
          spainGB={product.data_es_gb}
          isHighlighted={true}
        />

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