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
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-brand-50 to-white">
      {/* Fondo con patrón de puntos */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      {/* Iconos flotantes de WiFi */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <WifiIcon className="absolute top-20 right-[20%] text-primary/30 w-4 h-4 md:w-8 md:h-8 animate-float" />
        <WifiIcon className="absolute bottom-32 right-[30%] text-primary/25 w-3 h-3 md:w-6 md:h-6 animate-float delay-700" />
        <WifiIcon className="absolute top-1/2 left-[25%] text-primary/30 w-4 h-4 md:w-8 md:h-8 animate-float delay-500" />
        <WifiIcon className="absolute bottom-20 left-[35%] text-primary/20 w-3 h-3 md:w-7 md:h-7 animate-float delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 h-full">
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 h-full items-center">
          {/* Columna de contenido */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-white/50 backdrop-blur-sm w-fit">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              ¡Nuevo! eSIM instantánea disponible
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Viaja por Europa con Internet
                <span className="block mt-2 text-primary flex flex-wrap items-center gap-2">
                  ¡Siempre Conectado!
                  <WifiIcon className="w-6 h-6 md:w-12 md:h-12 text-primary animate-float" />
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-xl">
                Olvídate del roaming y las complicaciones. Mantente conectado en toda Europa con nuestras SIMs de datos de alta velocidad.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto animate-pulse hover:animate-none bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
                    ¿No sabes qué SIM necesitas? Descúbrelo aquí
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <SimQuiz />
                </DialogContent>
              </Dialog>
              
              {/* Texto de testimonios */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-1 md:ml-2 font-medium">4.9/5</span>
                </div>
                <span className="hidden md:inline">•</span>
                <span>+10,000 viajeros satisfechos</span>
                <span className="hidden md:inline">•</span>
                <span className="text-primary font-medium">Garantía de servicio</span>
              </div>
            </div>
          </div>

          {/* Columna de imagen - Solo visible en desktop */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Efectos de blob animados */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              
              {/* Imagen principal con marco decorativo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] transform rotate-6"></div>
                <div className="relative bg-white p-3 rounded-[2rem] shadow-xl transform -rotate-3 transition-transform hover:rotate-0 duration-500 border-4 border-white">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] opacity-50"></div>
                  <img
                    src="https://images.unsplash.com/photo-1517022812141-23620dba5c23"
                    alt="Persona feliz usando su teléfono"
                    className="w-full aspect-[4/3] object-cover rounded-[1.75rem] transform hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg transform rotate-3">
                    <p className="text-sm font-medium text-gray-900">¡Más de 10,000 viajeros conectados! 🌍</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}