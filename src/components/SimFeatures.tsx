import { Globe2, Signal, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function SimFeatures() {
  const features = [
    {
      icon: <Globe2 className="w-12 h-12 text-primary mb-4" />,
      title: "Cobertura Total",
      description: "Navega sin preocupaciones en cualquier país de la UE"
    },
    {
      icon: <Signal className="w-12 h-12 text-primary mb-4" />,
      title: "Red 4G/5G",
      description: "Conexión de alta velocidad en las principales redes europeas"
    },
    {
      icon: <Shield className="w-12 h-12 text-primary mb-4" />,
      title: "Garantía de Servicio",
      description: "Soporte 24/7 en español y garantía de devolución"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {features.map((feature, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          {feature.icon}
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}