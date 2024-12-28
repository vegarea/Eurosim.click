import { Header } from "@/components/Header";
import { ESimHero } from "@/components/ESimHero";
import { HowItWorks } from "@/components/HowItWorks";
import { CommonFeatures } from "@/components/CommonFeatures";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { ProductButton } from "@/components/esim/ProductButton";
import { PlanDetails } from "@/components/esim/PlanDetails";
import { FrequentQuestions } from "@/components/FrequentQuestions";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      return data;
    }
  });

  const [selectedPlan, setSelectedPlan] = useState(products[0] ? {
    title: products[0].title,
    description: `${products[0].data_eu_gb}GB Europa / ${products[0].data_es_gb}GB España`,
    price: products[0].price,
    features: [
      `${products[0].data_eu_gb}GB datos en toda Europa`,
      `${products[0].data_es_gb}GB exclusivo España`,
    ],
    europeGB: products[0].data_eu_gb,
    spainGB: products[0].data_es_gb
  } : null);

  const simCards = products.map(product => ({
    type: "esim" as const,
    title: product.title,
    description: `${product.data_eu_gb}GB Europa / ${product.data_es_gb}GB España`,
    price: product.price,
    features: [
      `${product.data_eu_gb}GB datos en toda Europa`,
      `${product.data_es_gb}GB exclusivo España`,
    ],
    europeGB: product.data_eu_gb,
    spainGB: product.data_es_gb
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      <ESimHero />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Elige tu eSIM ideal
          </h2>

          {!isLoading && (
            <div className={`flex ${isMobile ? 'flex-col-reverse' : 'md:flex-row'} gap-6 md:gap-8`}>
              <div className={`${isMobile ? 'w-full' : 'md:w-[65%]'} order-2 md:order-1`}>
                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {simCards.map((card) => (
                    <ProductButton
                      key={card.title}
                      title={card.title}
                      price={card.price}
                      type={card.type}
                      isSelected={selectedPlan?.title === card.title}
                      onClick={() => setSelectedPlan(card)}
                    />
                  ))}
                </div>
              </div>

              <div className={`${isMobile ? 'w-full' : 'md:w-[35%]'} order-1 md:order-2`}>
                <AnimatePresence mode="wait">
                  {selectedPlan && (
                    <PlanDetails
                      key={selectedPlan.title}
                      {...selectedPlan}
                    />
                  )}
                </AnimatePresence>
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