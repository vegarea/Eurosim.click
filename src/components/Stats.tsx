import { Users, Globe2, Headphones, Shield } from "lucide-react";

export function Stats() {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      number: "10,000+",
      label: "Viajeros Conectados",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-primary" />,
      number: "30+",
      label: "Países Cubiertos",
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      number: "24/7",
      label: "Soporte Técnico",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      number: "100%",
      label: "Garantía de Servicio",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-brand-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}