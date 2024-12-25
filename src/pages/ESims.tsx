import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { Wifi, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ESims = () => {
  const navigate = useNavigate();

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
      
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                  <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">eSIM</span> para Europa
                </h1>
                <p className="text-lg text-gray-600 max-w-xl">
                  Conectividad instantánea en toda la Unión Europea. 
                  Activa tu eSIM en segundos y comienza a navegar inmediatamente.
                </p>
              </div>
            </div>

            <div className="relative lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                
                <div className="relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-[2.5rem] transform rotate-6"></div>
                  <div className="relative bg-white p-3 rounded-[2rem] shadow-xl transform -rotate-3 transition-transform hover:rotate-0 duration-500 border-4 border-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-[2rem] opacity-50"></div>
                    <img
                      src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                      alt="Persona feliz usando su teléfono"
                      className="w-full h-full object-cover rounded-[1.75rem] transform hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg transform rotate-3">
                      <p className="text-sm font-medium text-gray-900">¡Activación inmediata! 🌍</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

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

          {/* Sección informativa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16 p-6 rounded-2xl bg-[#D3E4FD]/30 border border-[#D3E4FD] backdrop-blur-sm"
          >
            <div className="flex items-start gap-4 max-w-3xl mx-auto">
              <div className="p-3 bg-[#D3E4FD] rounded-xl">
                <Wifi className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¡Activación Inmediata!
                </h3>
                <p className="text-gray-600">
                  Recibe tu eSIM al instante y actívala cuando lo necesites. Compatible con la mayoría de dispositivos modernos. 
                  Sin necesidad de SIM física, sin esperas de envío.
                </p>
              </div>
            </div>
          </motion.div>

          <SimFeatures />
          <CountryCoverage />
        </div>
      </div>
    </div>
  );
};

export default ESims;
