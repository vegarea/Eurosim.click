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
    <div className="relative min-h-[80vh] overflow-hidden">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Efectos de fondo animados con opacidad reducida */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-30 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              ¡Viaja por Europa
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white bg-300% animate-gradient">
                Sin Preocupaciones!
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 max-w-2xl mx-auto backdrop-blur-sm bg-black/20 p-4 rounded-xl">
              Mantente conectado durante todo tu viaje con nuestras soluciones de internet móvil. 
              Elige la opción que mejor se adapte a ti y disfruta de una conexión confiable en toda Europa.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="animate-pulse hover:animate-none bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
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
      </div>

      {/* Elementos decorativos flotantes con opacidad reducida */}
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-xl animate-float z-20" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-xl animate-float delay-1000 z-20" />
    </div>
  );
}