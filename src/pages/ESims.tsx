import { Header } from "@/components/Header";
import { ESimHero } from "@/components/ESimHero";
import { HowItWorks } from "@/components/HowItWorks";
import { CommonFeatures } from "@/components/CommonFeatures";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { ProductButton } from "@/components/esim/ProductButton";
import { PlanDetails } from "@/components/esim/PlanDetails";
import { FrequentQuestions } from "@/components/FrequentQuestions";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database/products";

export default function ESims() {
  const isMobile = useIsMobile();
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['esims'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'esim')
        .eq('status', 'active');
      
      if (error) throw error;
      return data as Product[];
    }
  });

  const [selectedPlan, setSelectedPlan] = useState<Product | null>(null);

  // Efecto para establecer el plan por defecto cuando los productos se cargan
  useEffect(() => {
    if (products.length > 0) {
      const defaultProduct = products.find(p => p.title === "E-SIM L");
      if (defaultProduct) {
        setSelectedPlan(defaultProduct);
      }
    }
  }, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      <ESimHero />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Elige tu eSIM ideal
          </h2>

          {!isLoading && (
            <div className={`flex ${isMobile ? 'flex-col-reverse' : 'md:flex-row md:items-start md:space-x-6'} gap-4`}>
              <div className={`${isMobile ? 'w-full' : 'md:w-[45%]'} order-2 md:order-1`}>
                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1'} gap-2 md:gap-3`}>
                  {products.map((product) => (
                    <ProductButton
                      key={product.id}
                      title={product.title}
                      price={product.price}
                      type={product.type}
                      isSelected={selectedPlan?.id === product.id}
                      isPopular={product.title === "E-SIM L"}
                      onClick={() => setSelectedPlan(product)}
                    />
                  ))}
                </div>
              </div>

              <div className={`${isMobile ? 'w-full' : 'md:w-[55%] md:sticky md:top-4'} order-1 md:order-2`}>
                <div className="max-w-lg mx-auto">
                  <AnimatePresence mode="wait">
                    {selectedPlan && (
                      <PlanDetails
                        key={selectedPlan.id}
                        title={selectedPlan.title}
                        description={selectedPlan.description || ''}
                        price={selectedPlan.price}
                        features={selectedPlan.features as string[] || []}
                        europeGB={selectedPlan.data_eu_gb}
                        spainGB={selectedPlan.data_es_gb}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 md:mt-24 space-y-12 md:space-y-24">
            <CountryCoverage />
            <CommonFeatures />
            <SimFeatures />
            <HowItWorks />
            <FrequentQuestions />
          </div>
        </div>
      </div>
    </div>
  );
}