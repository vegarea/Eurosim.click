import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { motion } from "framer-motion";
import { ESimHero } from "@/components/ESimHero";

export default function ESims() {
  const simCards = [
    {
      type: "esim" as const,
      title: "eSIM S",
      description: "8GB Europa / 80GB España",
      price: 690,
      features: [
        "8GB datos en toda Europa",
        "80GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "Activación inmediata",
        "30 días de validez",
        "Hotspot incluido"
      ]
    },
    {
      type: "esim" as const,
      title: "eSIM M",
      description: "12GB Europa / 120GB España",
      price: 790,
      features: [
        "12GB datos en toda Europa",
        "120GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "Activación inmediata",
        "30 días de validez",
        "Hotspot incluido"
      ]
    },
    {
      type: "esim" as const,
      title: "eSIM L",
      description: "16GB Europa / 160GB España",
      price: 890,
      features: [
        "16GB datos en toda Europa",
        "160GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "Activación inmediata",
        "30 días de validez",
        "Hotspot incluido"
      ]
    },
    {
      type: "esim" as const,
      title: "eSIM XL",
      description: "22GB Europa / 190GB España",
      price: 1090,
      features: [
        "22GB datos en toda Europa",
        "190GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "Activación inmediata",
        "30 días de validez",
        "Hotspot incluido"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      <ESimHero />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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

          <SimFeatures />
          <CountryCoverage />
        </div>
      </div>
    </div>
  );
}