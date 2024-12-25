import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { DeliveryBenefits } from "@/components/DeliveryBenefits";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { Globe2 } from "lucide-react";
import { motion } from "framer-motion";

const Sims = () => {
  const simCards = [
    {
      type: "physical" as const,
      title: "Prepago XL",
      description: "16GB Europa / 160GB España",
      price: 890,
      features: [
        "16GB datos en toda Europa",
        "160GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "SIM card incluida",
        "30 días de validez",
        "Hotspot incluido"
      ]
    },
    {
      type: "physical" as const,
      title: "Prepago XXL",
      description: "22GB Europa / 190GB España",
      price: 1090,
      features: [
        "22GB datos en toda Europa",
        "190GB exclusivo España",
        "300 min llamadas internacionales",
        "Velocidad 5G/4G/3G+",
        "SIM card incluida",
        "30 días de validez"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50/50">
      <Header />
      
      <div className="relative">
        {/* Hero section con imagen de fondo */}
        <div className="relative h-[500px] overflow-hidden mb-12">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80"
              alt="Viajeros felices en Europa"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          </div>
          
          <div className="container mx-auto px-4 h-full relative">
            <div className="flex items-center h-full max-w-6xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl text-white"
              >
                <h1 className="text-5xl font-bold mb-6">
                  Conecta tu viaje por Europa
                </h1>
                <p className="text-xl mb-8 text-gray-100">
                  Mantente conectado en toda la Unión Europea con nuestros planes prepago. 
                  Disfruta de una experiencia sin complicaciones y comparte cada momento de tu aventura.
                </p>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                    <Globe2 className="h-6 w-6 text-white animate-pulse" />
                  </div>
                  <p className="text-gray-200">
                    Cobertura en más de 30 países de Europa
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {simCards.map((card, index) => (
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

            <DeliveryBenefits />
            <SimFeatures />
            <CountryCoverage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sims;