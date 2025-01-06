import { Button } from "@/components/ui/button";
import { ArrowRight, WifiIcon, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SimQuiz from "@/components/SimQuiz";
import { useSiteImages } from "@/hooks/useSiteImages";

export function HomeHero() {
  const { data: siteImages } = useSiteImages();
  const heroImage = siteImages?.find(img => img.location === "Hero Principal")?.currentUrl;

  return (
    <div className="relative min-h-[calc(100svh-5rem)] overflow-hidden">
      {/* Burbujas de gradiente animadas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-48 w-96 h-96 bg-gradient-to-l from-primary/20 to-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-gradient-to-t from-primary/20 to-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Fondo con patrón de puntos */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      {/* Degradado en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8">
        <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100svh-8rem)]">
          {/* Columna de contenido */}
          <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-white/50 backdrop-blur-sm self-start">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              ¡Nuevo! eSIM instantánea disponible
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
                Viaja por Europa con Internet
                <span className="block mt-1 sm:mt-2 text-primary flex items-center gap-1">
                  ¡Siempre Conectado!
                  <WifiIcon className="w-8 sm:w-12 lg:w-20 h-8 sm:h-12 lg:h-20 text-primary animate-float -ml-1" />
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-xl">
                Olvídate del roaming y las complicaciones. Mantente conectado en toda Europa con nuestras SIMs de datos de alta velocidad.
              </p>
            </div>

            {/* Botones de acción y testimonios */}
            <div className="flex flex-col gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="animate-pulse hover:animate-none bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg w-full sm:w-fit text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
                    ¿No sabes qué SIM necesitas? Descúbrelo aquí
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <SimQuiz />
                </DialogContent>
              </Dialog>
              
              {/* Testimonios */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
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

          {/* Columna de imagen - Visible en móvil y desktop */}
          <div className="relative order-first lg:order-last">
            <div className="relative max-w-[280px] sm:max-w-[400px] mx-auto lg:max-w-none">
              {/* Efectos de blob animados */}
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-52 sm:w-72 h-52 sm:h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-52 sm:w-72 h-52 sm:h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-6 sm:-bottom-8 left-14 sm:left-20 w-52 sm:w-72 h-52 sm:h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              
              {/* Imagen principal con marco decorativo */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] sm:rounded-[2.5rem] transform rotate-6"></div>
                <div className="relative bg-white p-2 sm:p-3 rounded-[1.75rem] sm:rounded-[2rem] shadow-xl transform -rotate-3 transition-transform hover:rotate-0 duration-500 border-3 sm:border-4 border-white">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[1.75rem] sm:rounded-[2rem] opacity-50"></div>
                  <img
                    src={heroImage}
                    alt="Persona feliz usando su teléfono"
                    className="w-full aspect-[4/3] object-cover rounded-[1.5rem] sm:rounded-[1.75rem] transform hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg transform rotate-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">¡Más de 10,000 viajeros conectados! 🌍</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Línea decorativa inferior con degradado */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
}
