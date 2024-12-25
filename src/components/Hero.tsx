import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Internet en Europa
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse">
                Simple y Sin Complicaciones
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Viaja por Europa con internet de alta velocidad. Elige entre nuestra SIM física con envío a domicilio o la eSIM digital instantánea.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transform transition-transform hover:scale-105">
              Ver Planes
              <ArrowRight className="ml-2 h-4 w-4 animate-bounce" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos animados */}
      <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-float" />
      </div>
      
      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 -z-10 transform-gpu blur-3xl">
        <div className="aspect-square h-56 bg-gradient-to-br from-primary to-secondary opacity-10 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 transform-gpu blur-3xl">
        <div className="aspect-square h-72 bg-gradient-to-tr from-secondary to-primary opacity-10 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>
    </div>
  );
}