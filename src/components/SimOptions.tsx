import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Globe2, CreditCard, Wifi, Truck, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MexicoFlag from "./icons/MexicoFlag";

export function SimOptions() {
  const navigate = useNavigate();

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

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* SIM Física */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl" />
            <div className="relative bg-white p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
                  <div className="relative p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl backdrop-blur-sm">
                    <CreditCard className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">SIM Física</h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    Entrega a domicilio a todo México
                    <MexicoFlag className="w-6 h-4" />
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-primary/60" />
                  <span>Compatible con todos los dispositivos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary/60" />
                  <span>SIM tradicional + adaptadores</span>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-5 h-5 text-primary/60" />
                  <span>Activación sencilla</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary/60" />
                  <span>Entrega en 72 hrs</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 group"
                onClick={() => navigate("/physical-sim")}
              >
                Conocer más
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* eSIM */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl" />
            <div className="relative bg-white p-12 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl animate-pulse" />
                  <div className="relative p-4 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl backdrop-blur-sm">
                    <Wifi className="w-12 h-12 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">eSIM</h3>
                  <p className="text-gray-600">Activación instantánea</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Globe2 className="w-5 h-5 text-secondary/60" />
                  <span>Activación inmediata</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-secondary/60" />
                  <span>Sin espera de entrega física</span>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-secondary/60" />
                  <span>Para dispositivos compatibles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary/60" />
                  <span>Entrega de código QR vía email</span>
                </div>
              </div>

              <Button 
                variant="secondary"
                className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90 group"
                onClick={() => navigate("/esim")}
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