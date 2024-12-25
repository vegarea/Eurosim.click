import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { motion, AnimatePresence } from "framer-motion";
import { ESimHero } from "@/components/ESimHero";
import { CommonFeatures } from "@/components/CommonFeatures";
import { UsageMeter } from "@/components/UsageMeter";
import { useState } from "react";

export default function ESims() {
  const [selectedPlan, setSelectedPlan] = useState({
    title: "Tarifa XL",
    europeGB: 16,
    spainGB: 160,
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
      isHighlighted: true,
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

  const handlePlanSelect = (plan: { title: string; europeGB: number; spainGB: number }) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      <ESimHero />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-7xl mx-auto">
          {/* Grid layout para productos y medidor */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Columna izquierda con productos en grid 2x2 */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {simCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <SimCard 
                    {...card} 
                    onSelect={() => handlePlanSelect({
                      title: card.title,
                      europeGB: card.europeGB,
                      spainGB: card.spainGB
                    })}
                    isSelected={selectedPlan.title === card.title}
                  />
                </motion.div>
              ))}
            </div>

            {/* Columna derecha con medidor fijo */}
            <motion.div
              className="lg:sticky lg:top-24 h-fit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlan.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Plan {selectedPlan.title}
                    </h3>
                    <UsageMeter 
                      europeGB={selectedPlan.europeGB} 
                      spainGB={selectedPlan.spainGB}
                      isHighlighted={true}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <CommonFeatures />
          <SimFeatures />
          <CountryCoverage />
        </div>
      </div>
    </div>
  );
}