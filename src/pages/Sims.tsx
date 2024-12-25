import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { motion } from "framer-motion";
import { DeliveryBenefits } from "@/components/DeliveryBenefits";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { Globe2, Truck } from "lucide-react";

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
        <div className="relative h-[500px] overflow-hidden">
          {/* Imagen de fondo */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Viajeros felices en Europa"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/90 to-secondary/90 mix-blend-multiply" />
          </div>

          {/* Contenido del hero */}
          <div className="relative h-full container mx-auto px-4">
            <div className="flex flex-col h-full justify-center max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Badge de entrega */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-white/90 text-primary px-4 py-2 rounded-full shadow-lg"
                >
                  <Truck className="w-5 h-5" />
                  <span className="font-medium">Entrega a domicilio en todo México</span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  SIM Física para Europa
                  <span className="block text-brand-50 mt-2">
                    Simple y Sin Complicaciones
                  </span>
                </h1>
                <p className="text-xl text-white/90 max-w-2xl">
                  Mantente conectado en toda la Unión Europea con nuestros planes prepago. 
                  Recibe tu SIM en la comodidad de tu hogar en México.
                </p>
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