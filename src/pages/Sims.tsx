import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { Globe2, Signal, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Sims = () => {
  const features = [
    "Cobertura en toda la Unión Europea",
    "Entrega a domicilio en todo México",
    "Activación sencilla y rápida",
    "Soporte técnico en español 24/7",
  ];

  const simCards = [
    {
      type: "physical" as const,
      title: "Prepago XL",
      description: "15GB para toda la UE",
      price: 799,
      features: [
        "15GB de datos 4G/5G",
        "30 días de validez",
        "Llamadas ilimitadas",
        "SMS ilimitados",
        "Hotspot incluido",
        "eSIM disponible"
      ]
    },
    {
      type: "physical" as const,
      title: "Prepago XXL",
      description: "25GB para toda la UE",
      price: 999,
      features: [
        "25GB de datos 4G/5G",
        "30 días de validez",
        "Llamadas ilimitadas",
        "SMS ilimitados",
        "Hotspot incluido",
        "eSIM disponible"
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

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <Globe2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cobertura Total</h3>
                <p className="text-gray-600">
                  Navega sin preocupaciones en cualquier país de la UE
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <Signal className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Red 4G/5G</h3>
                <p className="text-gray-600">
                  Conexión de alta velocidad en las principales redes europeas
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Garantía de Servicio</h3>
                <p className="text-gray-600">
                  Soporte 24/7 en español y garantía de devolución
                </p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">¿Por qué elegir nuestra SIM?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sims;
