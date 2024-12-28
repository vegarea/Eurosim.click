import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Globe2, CreditCard, Wifi, Truck, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MexicoFlag from "./icons/MexicoFlag";

export function SimOptions() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0 });
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Fondo con patrón de puntos */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute -z-10 top-1/4 right-0 w-72 h-72 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-1/4 left-0 w-72 h-72 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Elige tu Solución de Conectividad
        </h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Selecciona la opción que mejor se adapte a tus necesidades de conexión
        </p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {/* SIM Física */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl" />
            <div className="relative bg-white p-6 md:p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
                  <div className="relative p-3 md:p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl backdrop-blur-sm">
                    <CreditCard className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">SIM Card</h3>
                  <p className="text-sm md:text-base text-gray-600 flex items-center gap-2">
                    Entrega a domicilio a todo México
                    <MexicoFlag className="w-5 h-3 md:w-6 md:h-4" />
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-primary/60" />
                  <span className="text-sm md:text-base">Compatible con todos los dispositivos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-primary/60" />
                  <span className="text-sm md:text-base">SIM tradicional + adaptadores</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary/60" />
                  <span className="text-sm md:text-base">Activación sencilla</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 md:w-5 md:h-5 text-primary/60" />
                  <span className="text-sm md:text-base">Entrega en 72 hrs</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 group"
                onClick={() => handleNavigation("/sims")}
              >
                Conocer más
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* eSIM */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl" />
            <div className="relative bg-white p-6 md:p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl animate-pulse" />
                  <div className="relative p-3 md:p-4 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl backdrop-blur-sm">
                    <Wifi className="w-8 h-8 md:w-12 md:h-12 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">eSIM</h3>
                  <p className="text-sm md:text-base text-gray-600">Activación instantánea</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                  <Globe2 className="w-4 h-4 md:w-5 md:h-5 text-secondary/60" />
                  <span className="text-sm md:text-base">Activación inmediata</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-4 h-4 md:w-5 md:h-5 text-secondary/60" />
                  <span className="text-sm md:text-base">Sin espera de entrega física</span>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-secondary/60" />
                  <span className="text-sm md:text-base">Para dispositivos compatibles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-secondary/60" />
                  <span className="text-sm md:text-base">Entrega de código QR vía email</span>
                </div>
              </div>

              <Button 
                variant="secondary"
                className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90 group"
                onClick={() => handleNavigation("/e-sims")}
              >
                Conocer más
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}