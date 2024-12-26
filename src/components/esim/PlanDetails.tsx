import { motion } from "framer-motion";
import { UsageMeter } from "@/components/UsageMeter";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PlanDetailsProps {
  title: string;
  description: string;
  features: string[];
  europeGB: number;
  spainGB: number;
}

export function PlanDetails({ title, description, features, europeGB, spainGB }: PlanDetailsProps) {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Producto añadido al carrito",
      description: `Has seleccionado el plan ${title}`,
    });
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