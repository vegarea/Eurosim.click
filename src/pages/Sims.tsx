import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Package2, Signal, Globe2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sims = () => {
  const navigate = useNavigate();

  const features = [
    "Cobertura en toda la Unión Europea",
    "Entrega a domicilio en todo México",
    "Activación sencilla y rápida",
    "Soporte técnico en español 24/7",
    "Compatible con todos los dispositivos",
    "Planes desde 8GB hasta 25GB"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-50/50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-brand-600 bg-clip-text text-transparent">
              SIM Física para Europa
            </h1>
            <p className="text-xl text-gray-600">
              Tu conexión garantizada en toda la Unión Europea
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Package2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Entrega a Domicilio</h3>
                <p className="text-gray-600">
                  Recibe tu SIM en la comodidad de tu hogar en cualquier parte de México
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Signal className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Conexión Estable</h3>
                <p className="text-gray-600">
                  Red 4G/LTE de alta velocidad en toda Europa
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Globe2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cobertura Total</h3>
                <p className="text-gray-600">
                  Navega sin preocupaciones en cualquier país de la UE
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Características Incluidas</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-8 bg-gradient-to-r from-primary to-brand-600"
              >
                Ver Planes Disponibles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sims;