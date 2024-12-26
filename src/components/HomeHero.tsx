import { Button } from "@/components/ui/button";
import { ArrowRight, Star, WifiIcon, SignalHigh } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SimQuiz from "@/components/SimQuiz";

export function HomeHero() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-brand-50 to-white">
      {/* Fondo con patrón de puntos */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      {/* Iconos flotantes de WiFi */}
      <div className="absolute inset-0 pointer-events-none">
        <WifiIcon className="absolute top-20 right-[20%] text-primary/30 w-6 h-6 md:w-8 md:h-8 animate-float" />
        <WifiIcon className="absolute bottom-32 right-[30%] text-primary/25 w-4 h-4 md:w-6 md:h-6 animate-float delay-700" />
        <WifiIcon className="absolute top-1/2 left-[25%] text-primary/30 w-6 h-6 md:w-8 md:h-8 animate-float delay-500" />
        <WifiIcon className="absolute bottom-20 left-[35%] text-primary/20 w-5 h-5 md:w-7 md:h-7 animate-float delay-1000" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-4 md:py-8">
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[calc(100vh-4rem)] py-8 md:py-12">
          {/* Columna de contenido */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-8">
            <div className="inline-flex items-center rounded-full border px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium bg-white/50 backdrop-blur-sm w-fit">
              <span className="relative flex h-1.5 md:h-2 w-1.5 md:w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 md:h-2 w-1.5 md:w-2 bg-green-500"></span>
              </span>
              ¡Nuevo! eSIM instantánea disponible
            </div>
            
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-3 md:mb-6">
                Viaja por Europa con Internet
                <span className="block mt-2 text-primary flex items-center gap-1">
                  ¡Siempre Conectado!
                  <WifiIcon className="w-8 h-8 md:w-20 md:h-20 text-primary animate-float -ml-1" />
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-xl">
                Olvídate del roaming y las complicaciones. Mantente conectado en toda Europa con nuestras SIMs de datos de alta velocidad.
              </p>
            </div>

            {/* Botones de acción y testimonios */}
            <div className="flex flex-col gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="animate-pulse hover:animate-none bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg w-fit text-sm md:text-base">
                    ¿No sabes qué SIM necesitas? Descúbrelo aquí
                    <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <SimQuiz />
                </DialogContent>
              </Dialog>
              
              {/* Texto de testimonios */}
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 font-medium">4.9/5</span>
                </div>
                <span className="hidden md:inline mx-2">•</span>
                <span>+10,000 viajeros satisfechos</span>
                <span className="hidden md:inline mx-2">•</span>
                <span className="text-primary font-medium">Garantía de servicio</span>
              </div>
            </div>
          </div>

          {/* Columna de imagen */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Efectos de blob animados */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              
              {/* Imagen principal con marco decorativo */}
              <div className="relative z-10 rounded-2xl overflow-hidden bg-white p-2 shadow-2xl ring-1 ring-gray-900/10 rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
                  alt="Persona feliz usando su teléfono"
                  className="w-full h-full object-cover rounded-xl"
                />
                
                {/* Badge flotante */}
                <div className="absolute -bottom-2 -right-2 bg-white px-4 py-2 rounded-lg shadow-lg transform rotate--2">
                  <p className="text-sm font-medium text-gray-900">¡Más de 10,000 viajeros conectados! 🌍</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
}