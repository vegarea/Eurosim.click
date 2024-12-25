import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { motion } from "framer-motion";
import { DeliveryBenefits } from "@/components/DeliveryBenefits";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";

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
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 to-transparent pointer-events-none h-96" />
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-brand-600 bg-clip-text text-transparent">
                SIM Física para Europa
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Mantente conectado en toda la Unión Europea con nuestros planes prepago
              </p>
            </motion.div>

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