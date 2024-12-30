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
      className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden max-h-[600px]"
    >
      {/* Header con precio y GB */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {product.title}
          </h2>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary flex items-baseline gap-1 justify-end">
              {amount}
              <span className="text-sm font-normal text-gray-500">{currency}</span>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/80 rounded-lg p-2 text-center">
            <p className="text-xl font-bold text-primary">{product.data_eu_gb}GB</p>
            <p className="text-xs text-gray-600">Europa</p>
          </div>
          <div className="bg-white/80 rounded-lg p-2 text-center">
            <p className="text-xl font-bold text-primary">{product.data_es_gb}GB</p>
            <p className="text-xs text-gray-600">España</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4 space-y-4">
        {/* Características */}
        <div className="space-y-1.5">
          {features.map((feature, index) => (
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

        {/* Medidor de uso con altura reducida */}
        <div className="scale-95 origin-top">
          <UsageMeter
            europeGB={product.data_eu_gb}
            spainGB={product.data_es_gb}
            isHighlighted={true}
          />
        </div>

        {/* Botón de compra */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-2"
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