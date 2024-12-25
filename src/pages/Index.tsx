import { Hero } from "@/components/Hero";
import { SimCard } from "@/components/SimCard";

const Index = () => {
  const simOptions = [
    {
      type: "physical" as const,
      title: "SIM Física",
      description: "Tarjeta SIM tradicional con envío a domicilio en México",
      price: 599,
      features: [
        "Envío a domicilio en México",
        "Datos 4G/5G ilimitados",
        "Cobertura en toda Europa",
        "Activación sencilla",
        "Soporte en español 24/7",
      ],
    },
    {
      type: "esim" as const,
      title: "eSIM Digital",
      description: "Activación instantánea para dispositivos compatibles",
      price: 499,
      features: [
        "Activación instantánea",
        "Datos 4G/5G ilimitados",
        "Cobertura en toda Europa",
        "Sin espera de envío",
        "Soporte en español 24/7",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Elige tu Plan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Selecciona el tipo de SIM que mejor se adapte a tus necesidades. Ambas opciones te brindan la mejor cobertura en Europa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 justify-items-center relative z-10">
            {simOptions.map((option, index) => (
              <div
                key={option.type}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <SimCard {...option} />
              </div>
            ))}
          </div>
        </div>

        {/* Elementos decorativos de fondo */}
        <div className="absolute top-1/4 right-0 -z-10 transform-gpu blur-3xl">
          <div className="aspect-square h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="absolute bottom-1/4 left-0 -z-10 transform-gpu blur-3xl">
          <div className="aspect-square h-96 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full animate-float" style={{ animationDelay: "2.5s" }} />
        </div>
      </section>
    </div>
  );
};

export default Index;