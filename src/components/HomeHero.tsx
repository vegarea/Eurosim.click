import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SimQuiz from "@/components/SimQuiz";

export function HomeHero() {
  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-trust to-white">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-24 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Columna de texto */}
          <div className="text-left space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                ¡Viaja por Europa
                <span className="block text-trust-foreground">
                  Sin Preocupaciones!
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl backdrop-blur-sm bg-white/50 p-4 rounded-xl">
                Mantente conectado durante todo tu viaje con nuestras soluciones de internet móvil. 
                Elige la opción que mejor se adapte a ti y disfruta de una conexión confiable en toda Europa.
              </p>
            </div>
            <div className="flex items-start gap-x-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary-hover text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    ¿No sabes qué SIM necesitas? Descúbrelo aquí
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <SimQuiz />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Columna de imagen */}
          <div className="relative h-full flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-trust rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-success rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <img
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                alt="Persona feliz usando su teléfono"
                className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-gradient-to-br from-trust to-success rounded-full blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-gradient-to-tr from-success to-trust rounded-full blur-xl animate-float delay-1000" />
    </div>
  );
}