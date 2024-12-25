import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-brand-50 min-h-screen">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Internet en Europa
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">
                Simple y Sin Complicaciones
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto backdrop-blur-sm bg-white/30 p-4 rounded-xl">
              Viaja por Europa con internet de alta velocidad. Elige entre nuestra SIM física con envío a domicilio o la eSIM digital instantánea.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary/20">
              Ver Planes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-xl animate-float delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg animate-float delay-500" />
      <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-l from-secondary/15 to-primary/15 rounded-full blur-lg animate-float delay-700" />
    </div>
  );
}