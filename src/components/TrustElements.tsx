import { Shield, Star, Clock, Globe2, Users, Headphones, CheckCircle } from "lucide-react";

export function TrustElements() {
  const features = [
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
      icon: <Globe2 className="w-8 h-8" />,
      title: "Cobertura Total",
      description: "Conectividad en todos los países de la Unión Europea"
    }
  ];

  const stats = [
    {
      value: "10,000+",
      label: "Viajeros Conectados",
      icon: <Users className="w-6 h-6" />
    },
    {
      value: "30+",
      label: "Países Cubiertos",
      icon: <Globe2 className="w-6 h-6" />
    },
    {
      value: "24/7",
      label: "Soporte Técnico",
      icon: <Headphones className="w-6 h-6" />
    },
    {
      value: "100%",
      label: "Garantía de Servicio",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-brand-50/50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          ¿Por qué Elegirnos?
        </h2>
        
        {/* Features Grid - Características principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl transform -rotate-2 group-hover:rotate-1 transition-transform" />
              <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-primary bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section - Estadísticas */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center space-y-2 group"
              >
                <div className="w-12 h-12 flex items-center justify-center text-primary bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-gray-600 text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}