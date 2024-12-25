import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { motion } from "framer-motion";
import { ESimHero } from "@/components/ESimHero";
import { CommonFeatures } from "@/components/CommonFeatures";

export default function ESims() {
  const simCards = [
    {
      type: "esim" as const,
      title: "Tarifa M",
      description: "8GB Europa / 100GB España",
      price: 419,
      features: [
        "8GB datos en toda Europa",
        "100GB exclusivo España",
      ]
    },
    {
      type: "esim" as const,
      title: "Tarifa L",
      description: "11GB Europa / 140GB España",
      price: 587,
      features: [
        "11GB datos en toda Europa",
        "140GB exclusivo España",
      ]
    },
    {
      type: "esim" as const,
      title: "Tarifa XL",
      description: "16GB Europa / 160GB España",
      price: 817,
      features: [
        "16GB datos en toda Europa",
        "160GB exclusivo España",
      ]
    },
    {
      type: "esim" as const,
      title: "Tarifa XXL",
      description: "22GB Europa / 190GB España",
      price: 1027,
      features: [
        "22GB datos en toda Europa",
        "190GB exclusivo España",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      <ESimHero />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

          <CommonFeatures />
          <SimFeatures />
          <CountryCoverage />
        </div>
      </div>
    </div>
  );
}