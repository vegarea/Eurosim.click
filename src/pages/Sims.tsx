import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { DeliveryBenefits } from "@/components/DeliveryBenefits";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { Truck, Calendar } from "lucide-react";
import MexicoFlag from "@/components/icons/MexicoFlag";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Sims = () => {
  const isMobile = useIsMobile();
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

        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4 lg:py-8">
          <div className="relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
              <div className="inline-flex items-center rounded-full border px-3 py-1 lg:px-4 lg:py-1.5 text-sm font-medium bg-white/50 backdrop-blur-sm">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <Truck className="w-4 h-4 mr-2" />
                <MexicoFlag className="w-6 h-4 mr-2" />
                <span className={isMobile ? "text-xs" : "text-sm"}>
                  Entrega a domicilio en todo México
                </span>
              </div>
              
              <div>
                <h1 className="text-3xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4 lg:mb-6">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SIM Física</span> para Europa
                </h1>
                <p className="text-base lg:text-lg text-gray-600 max-w-xl">
                  Mantente conectado en toda la Unión Europea con nuestros planes prepago. 
                  Recibe tu SIM en la comodidad de tu hogar.
                </p>
              </div>
            </div>

            <div className="relative lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-48 lg:w-72 h-48 lg:h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -top-4 -right-4 w-48 lg:w-72 h-48 lg:h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-48 lg:w-72 h-48 lg:h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                
                <div className="relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] transform rotate-6"></div>
                  <div className="relative bg-white p-3 rounded-[2rem] shadow-xl transform -rotate-3 transition-transform hover:rotate-0 duration-500 border-4 border-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] opacity-50"></div>
                    <img
                      src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                      alt="Persona feliz usando su teléfono"
                      className="w-full h-full object-cover rounded-[1.75rem] transform hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl shadow-lg transform rotate-3">
                      <p className="text-xs lg:text-sm font-medium text-gray-900">¡Más de 10,000 viajeros conectados! 🌍</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-8 mb-8">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 lg:mb-16 p-4 lg:p-6 rounded-2xl bg-[#D3E4FD]/30 border border-[#D3E4FD] backdrop-blur-sm"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 max-w-3xl mx-auto">
              <div className="p-3 bg-[#D3E4FD] rounded-xl shrink-0">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                  ¡Compra tu SIM con anticipación!
                </h3>
                <p className="text-sm lg:text-base text-gray-600">
                  No te preocupes por comprar tu SIM con meses de anticipación. Tu SIM se activará automáticamente en tu fecha de llegada a Europa, y a partir de ese momento comenzarán a contar los 30 días de validez. Así puedes asegurar tu conectividad con tiempo.
                </p>
              </div>
            </div>
          </motion.div>

          <DeliveryBenefits />
          <SimFeatures />
          <CountryCoverage />
        </div>
      </div>
    </div>
  );
};

export default Sims;