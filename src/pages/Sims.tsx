import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { DeliveryBenefits } from "@/components/DeliveryBenefits";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { Truck, Calendar } from "lucide-react";
import MexicoFlag from "@/components/icons/MexicoFlag";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Sims = () => {
  const isMobile = useIsMobile();

  const { data: products, isLoading } = useQuery({
    queryKey: ['physical-sims'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'physical')
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    }
  });

  const simCards = products?.map(product => ({
    type: "physical" as const,
    title: product.title,
    description: `${product.data_eu_gb}GB Europa / ${product.data_es_gb}GB España`,
    price: product.price,
    features: [
      `${product.data_eu_gb}GB datos en toda Europa`,
      `${product.data_es_gb}GB exclusivo España`,
      "Velocidad 5G/4G/3G+",
      "SIM card incluida",
      `${product.validity_days} días de validez`,
      "Hotspot incluido"
    ]
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8 lg:py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-8 mb-8">
            {!isLoading && simCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <SimCard {...card} />
              </motion.div>
            ))}
          </div>

          <CountryCoverage />
          <DeliveryBenefits />
          <SimFeatures />
        </div>
      </div>
    </div>
  );
};

export default Sims;
