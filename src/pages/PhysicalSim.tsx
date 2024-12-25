import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Package, Shield, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PhysicalSim = () => {
  const navigate = useNavigate();

  const features = [
    "Envío a domicilio en 24-72 horas",
    "Compatible con todos los dispositivos",
    "Planes de 20GB y 30GB disponibles",
    "Activación programada para tu fecha de viaje",
    "Soporte técnico en español 24/7",
    "Cobertura en toda la Unión Europea"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-50/50">
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
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SIM Física para tu Viaje
            </h1>
            <p className="text-xl text-gray-600">
              La manera más tradicional y confiable de mantenerte conectado en Europa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Package className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Envío Seguro</h3>
                <p className="text-gray-600">
                  Recibe tu SIM en la comodidad de tu hogar antes de tu viaje
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Smartphone className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Compatibilidad Universal</h3>
                <p className="text-gray-600">
                  Funciona con cualquier dispositivo que use SIM tradicional
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Garantía de Servicio</h3>
                <p className="text-gray-600">
                  Soporte técnico en español y cobertura garantizada
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
              <Button className="w-full mt-8 bg-gradient-to-r from-primary to-secondary">
                Ver Planes Disponibles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalSim;