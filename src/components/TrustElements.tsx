import { Shield, Star, Clock, Globe } from "lucide-react";

export function TrustElements() {
  const trustItems = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Garantía de Servicio",
      description: "Conexión confiable y soporte 24/7 durante tu viaje"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Experiencia Comprobada",
      description: "Miles de viajeros satisfechos por toda Europa"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Activación Rápida",
      description: "Comienza a navegar en minutos con eSIM o recibe tu SIM física antes de viajar"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Cobertura Total",
      description: "Conectividad en todos los países de la Unión Europea"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-brand-50/50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          ¿Por qué Elegirnos?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-primary bg-primary/10 rounded-full">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
              <p className="text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}