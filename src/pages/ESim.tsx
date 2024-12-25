import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Zap, Globe2, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ESim = () => {
  const navigate = useNavigate();

  const features = [
    "Activación instantánea con código QR",
    "Planes desde 8GB hasta 25GB",
    "Sin necesidad de envío físico",
    "Perfecto para múltiples destinos",
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
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              eSIM: Conectividad Instantánea
            </h1>
            <p className="text-xl text-gray-600">
              La solución digital moderna para mantenerte conectado en Europa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Zap className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Activación Inmediata</h3>
                <p className="text-gray-600">
                  Configura tu eSIM en minutos y comienza a navegar al instante
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <QrCode className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instalación Simple</h3>
                <p className="text-gray-600">
                  Escanea el código QR y sigue las instrucciones paso a paso
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <Globe2 className="w-12 h-12 text-secondary mb-4" />
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
                    <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-8 bg-gradient-to-r from-secondary to-primary"
                variant="secondary"
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

export default ESim;