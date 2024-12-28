import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PlanDetailsProps {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  europeGB: number;
  spainGB: number;
  type: "physical" | "esim";
}

export function PlanDetails({ 
  id,
  title, 
  description, 
  price, 
  features,
  europeGB,
  spainGB,
  type
}: PlanDetailsProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      await addItem({
        id,
        type,
        title,
        description,
        price
      });
      navigate('/checkout');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error instanceof Error ? error.message : 'Error al añadir al carrito');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500">MXN</span>
        </div>

        <div className="space-y-2">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Datos incluidos:</h4>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Europa: {europeGB}GB</p>
              <p className="text-sm text-gray-600">España: {spainGB}GB</p>
            </div>
          </div>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button 
        className="w-full bg-gradient-to-r from-primary to-primary/90"
        onClick={handleAddToCart}
      >
        Comprar ahora
      </Button>
    </motion.div>
  );
}