import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { DeliveryBenefits } from "@/components/DeliveryBenefits";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { SimHero } from "@/components/SimHero";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database/products";

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
      
      return data as Product[];
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <SimHero />
      
      <div id="products-section" className="container mx-auto px-4 py-8 lg:py-12 relative scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-8 mb-8">
            {!isLoading && products?.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <SimCard product={product} />
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