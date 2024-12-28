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

export default function ESims() {
  const isMobile = useIsMobile();
  const [selectedPlan, setSelectedPlan] = useState({
    title: "Tarifa XL",
    description: "16GB Europa / 160GB España",
    price: 817,
    features: [
      "16GB datos en toda Europa",
      "160GB exclusivo España",
    ],
    europeGB: 16,
    spainGB: 160
  });

  const simCards = [
    {
      type: "esim" as const,
      title: "Tarifa M",
      description: "8GB Europa / 100GB España",
      price: 419,
      features: [
        "8GB datos en toda Europa",
        "100GB exclusivo España",
      ],
      europeGB: 8,
      spainGB: 100
    },
    {
      type: "esim" as const,
      title: "Tarifa L",
      description: "11GB Europa / 140GB España",
      price: 587,
      features: [
        "11GB datos en toda Europa",
        "140GB exclusivo España",
      ],
      europeGB: 11,
      spainGB: 140
    },
    {
      type: "esim" as const,
      title: "Tarifa XL",
      description: "16GB Europa / 160GB España",
      price: 817,
      features: [
        "16GB datos en toda Europa",
        "160GB exclusivo España",
      ],
      europeGB: 16,
      spainGB: 160
    },
    {
      type: "esim" as const,
      title: "Tarifa XXL",
      description: "22GB Europa / 190GB España",
      price: 1027,
      features: [
        "22GB datos en toda Europa",
        "190GB exclusivo España",
      ],
      europeGB: 22,
      spainGB: 190
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      <ESimHero />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Elige tu eSIM ideal
          </h2>

          <div className={`flex ${isMobile ? 'flex-col-reverse' : 'md:flex-row'} gap-6 md:gap-8`}>
            {/* Panel de selección de planes */}
            <div className={`${isMobile ? 'w-full' : 'md:w-[65%]'} order-2 md:order-1`}>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {simCards.map((card) => (
                  <ProductButton
                    key={card.title}
                    title={card.title}
                    price={card.price}
                    type={card.type}
                    isSelected={selectedPlan.title === card.title}
                    onClick={() => setSelectedPlan(card)}
                  />
                ))}
              </div>
            </div>

            {/* Panel de detalles del plan */}
            <div className={`${isMobile ? 'w-full' : 'md:w-[35%]'} order-1 md:order-2`}>
              <AnimatePresence mode="wait">
                <PlanDetails
                  key={selectedPlan.title}
                  {...selectedPlan}
                />
              </AnimatePresence>
            </div>
          </div>

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