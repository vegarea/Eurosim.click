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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-brand-50">
      {/* Fondo con patrón de puntos */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      {/* Iconos flotantes de WiFi */}
      <div className="absolute inset-0 pointer-events-none">
        <WifiIcon className="absolute top-20 right-[20%] text-primary/30 w-8 h-8 animate-float" />
        <WifiIcon className="absolute bottom-32 right-[30%] text-primary/25 w-6 h-6 animate-float delay-700" />
        <WifiIcon className="absolute top-1/2 left-[25%] text-primary/30 w-8 h-8 animate-float delay-500" />
        <WifiIcon className="absolute bottom-20 left-[35%] text-primary/20 w-7 h-7 animate-float delay-1000" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          {/* Columna de contenido */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-white/50 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              ¡Nuevo! eSIM instantánea disponible
            </div>
            
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                Viaja por Europa con Internet
                <span className="block mt-2 text-primary flex items-center gap-1">
                  ¡Siempre Conectado!
                  <WifiIcon className="w-20 h-20 text-primary animate-float -ml-1" />
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Olvídate del roaming y las complicaciones. Mantente conectado en toda Europa con nuestras SIMs de datos de alta velocidad.
              </p>
            </div>

            {/* Botones de acción y testimonios */}
            <div className="flex flex-col gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="animate-pulse hover:animate-none bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg w-fit">
                    ¿No sabes qué SIM necesitas? Descúbrelo aquí
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <SimQuiz />
                </DialogContent>
              </Dialog>
              
              {/* Nuevo texto de testimonios */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 font-medium">4.9/5</span>
                </div>
                <span className="mx-2">•</span>
                <span>+10,000 viajeros satisfechos</span>
                <span className="mx-2">•</span>
                <span className="text-primary font-medium">Garantía de servicio</span>
              </div>
            </div>
          </div>

          {/* Columna de imagen */}
          <div className="relative lg:block">
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