import { Truck, Clock, MapPin, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export function DeliveryBenefits() {
  const deliveryFeatures = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Entrega a Domicilio",
      description: "Envío garantizado a cualquier parte de México"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Entrega en 72 hrs",
      description: "Recibe tu SIM en tiempo récord"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Cobertura Nacional",
      description: "Servicio de entrega en toda la República Mexicana"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "SIM Lista para Usar",
      description: "Activación sencilla y rápida al recibirla"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 mb-16"
    >
      <h3 className="text-2xl font-bold text-center mb-8">
        Entrega Rápida y Segura en México
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryFeatures.map((feature, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-primary bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold mb-2 text-center">{feature.title}</h4>
            <p className="text-gray-600 text-center text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}