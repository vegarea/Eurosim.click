import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Globe2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SimOptions() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Elige tu Solución de Conectividad
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* SIM Física */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl" />
            <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
              <Smartphone className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">SIM Física</h3>
              <p className="text-gray-600 mb-6">
                Recibe tu SIM en casa antes de viajar. Perfecta para cualquier dispositivo.
              </p>
              <Button 
                className="w-full"
                onClick={() => navigate("/physical-sim")}
              >
                Conocer más
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* eSIM */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl" />
            <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
              <Globe2 className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4">eSIM</h3>
              <p className="text-gray-600 mb-6">
                Activación instantánea. Ideal para dispositivos modernos compatibles.
              </p>
              <Button 
                variant="secondary"
                className="w-full"
                onClick={() => navigate("/esim")}
              >
                Conocer más
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}