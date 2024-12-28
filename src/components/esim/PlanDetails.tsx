import { motion } from "framer-motion";
import { UsageMeter } from "@/components/UsageMeter";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);

  // Map of eSIM titles to their IDs
  const PRODUCT_IDS: Record<string, string> = {
    "E-SIM S": "ccdbdc7f-674a-4cf5-baae-b9105b821105",
    "E-SIM M": "2c6d8a85-0211-472b-b6d6-4a207a4f9f8d",
    "E-SIM L": "5304a466-dc0f-4f85-abe6-19564dd10f1b",
    "E-SIM XL": "77993e6d-057a-4d99-8154-32c00fab068a"
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const productId = PRODUCT_IDS[title];
      
      if (!productId) {
        throw new Error('Producto no encontrado');
      }

      await addItem({
        id: productId,
        type: "esim",
        title,
        description,
        price
      });
      
      navigate('/checkout');
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      toast.error(error instanceof Error ? error.message : 'Error al añadir al carrito');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-lg"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {title}
      </h2>

      <div className="space-y-3 mb-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <span className="text-gray-700">{feature}</span>
          </motion.div>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-3xl font-bold text-primary">
          ${price}
          <span className="text-sm font-normal text-gray-600 ml-1">MXN</span>
        </p>
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
        className="mt-6"
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
