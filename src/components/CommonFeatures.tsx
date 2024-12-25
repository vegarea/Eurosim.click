import { Phone, Signal, Clock, Wifi, Globe2, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export function CommonFeatures() {
  const commonFeatures = [
    {
      icon: <Phone className="w-5 h-5" />,
      text: "300 min llamadas internacionales"
    },
    {
      icon: <Signal className="w-5 h-5" />,
      text: "Velocidad 5G/4G/3G+"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: "30 días de validez"
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      text: "Hotspot incluido"
    },
    {
      icon: <Globe2 className="w-5 h-5" />,
      text: "Número local gratuito"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      text: "Activación inmediata"
    }
  ];

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Incluido en todos los planes
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {commonFeatures.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                {feature.icon}
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}