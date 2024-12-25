import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { DeliveryBenefits } from "@/components/DeliveryBenefits";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { Truck } from "lucide-react";
import MexicoFlag from "@/components/icons/MexicoFlag";
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
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col justify-center space-y-8">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-white/50 backdrop-blur-sm">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <Truck className="w-4 h-4 mr-2" />
                <MexicoFlag className="w-6 h-4 mr-2" />
                Entrega a domicilio en todo México
              </div>
              
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SIM Física</span> para Europa
                </h1>
                <p className="text-lg text-gray-600 max-w-xl">
                  Mantente conectado en toda la Unión Europea con nuestros planes prepago. 
                  Recibe tu SIM en la comodidad de tu hogar.
                </p>
              </div>
            </div>

            <div className="relative lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                
                <div className="relative z-10 rounded-2xl overflow-hidden bg-white p-2 shadow-2xl ring-1 ring-gray-900/10 rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                    alt="Persona feliz usando su teléfono"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
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
  );
};

export default Sims;
