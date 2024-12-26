import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { motion, AnimatePresence } from "framer-motion";
import { ESimHero } from "@/components/ESimHero";
import { CommonFeatures } from "@/components/CommonFeatures";
import { UsageMeter } from "@/components/UsageMeter";
import { useState } from "react";
import { CreditCard, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

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

  // Función para determinar el color según el título
  const getColorScheme = (title: string) => {
    switch (title) {
      case "Tarifa M":
        return {
          iconBg: "from-[#F2FCE2] to-[#E5F7D3]",
          iconColor: "text-green-600"
        };
      case "Tarifa L":
        return {
          iconBg: "from-[#D3E4FD] to-[#C4D9F7]",
          iconColor: "text-blue-600"
        };
      case "Tarifa XL":
        return {
          iconBg: "from-[#E5DEFF] to-[#D6CFFF]",
          iconColor: "text-purple-600"
        };
      case "Tarifa XXL":
        return {
          iconBg: "from-[#FFDEE2] to-[#FFD0D5]",
          iconColor: "text-pink-600"
        };
      default:
        return {
          iconBg: "from-[#D3E4FD] to-[#C4D9F7]",
          iconColor: "text-blue-600"
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      <ESimHero />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Panel de selección de planes */}
            <div className="lg:w-1/3 space-y-4">
              {simCards.map((card, index) => {
                const colorScheme = getColorScheme(card.title);
                return (
                  <motion.button
                    key={card.title}
                    onClick={() => handlePlanSelect({
                      title: card.title,
                      europeGB: card.europeGB,
                      spainGB: card.spainGB
                    })}
                    className={cn(
                      "w-full p-4 rounded-xl transition-all duration-300",
                      selectedPlan.title === card.title
                        ? "bg-white shadow-lg scale-105"
                        : "bg-white/50 hover:bg-white hover:shadow-md"
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gradient-to-br ${colorScheme.iconBg} rounded-xl`}>
                        <Wifi className={`h-6 w-6 ${colorScheme.iconColor}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-bold text-lg">{card.title}</h3>
                        <p className="text-2xl font-bold text-primary">
                          ${card.price}
                          <span className="text-sm font-normal text-gray-600 ml-1">MXN</span>
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Panel de detalles del plan */}
            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlan.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 rounded-2xl shadow-lg"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {selectedPlan.title}
                      </h2>
                      <div className="space-y-4">
                        {simCards.find(card => card.title === selectedPlan.title)?.features.map((feature, index) => (
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
                    </div>
                    <div>
                      <UsageMeter 
                        europeGB={selectedPlan.europeGB} 
                        spainGB={selectedPlan.spainGB}
                        isHighlighted={true}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-24">
            <CommonFeatures />
            <SimFeatures />
            <CountryCoverage />
          </div>
        </div>
      </div>
    </div>
  );
}