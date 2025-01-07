import { Button } from "@/components/ui/button";
import EUFlag from "@/components/icons/EUFlag";
import MexicoFlag from "@/components/icons/MexicoFlag";
import { Truck, ArrowDown, Play } from "lucide-react";
import { useSiteImages } from "@/hooks/useSiteImages";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

export function SimHero() {
  const { data: siteImages } = useSiteImages();
  const heroImage = siteImages?.find(img => img.location === "Hero SIM Física")?.currentUrl;
  const [videoOpen, setVideoOpen] = useState(false);

  const scrollToProducts = () => {
    const productsSection = document.querySelector('#products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-brand-50 min-h-[90vh]">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <div className="animate-fade-in space-y-6">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl flex items-center gap-4">
                <span className="text-primary">SIM Card</span> para
                <EUFlag className="h-12 w-16 inline-block" />
                Europa
              </h1>
              <p className="text-lg font-semibold leading-8 text-gray-800 backdrop-blur-sm bg-white/30 p-4 rounded-xl flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary flex-shrink-0" />
                <span>
                  Entrega a domicilio en toda la República Mexicana
                  <MexicoFlag className="h-5 w-8 inline-block ml-2" />
                </span>
              </p>
              <p className="text-base leading-7 text-gray-600 backdrop-blur-sm bg-white/30 p-4 rounded-xl">
                ¿Quieres estar tranquilo antes de iniciar tu viaje y tener tu SIM card antes de salir de casa? ¡Pídela ahora! y recibela en casa. ¡Inicia tu viaje por Europa desde el primer minuto a tu llegada!
              </p>

              <Button 
                onClick={scrollToProducts}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary/20 group"
              >
                Ver Tarifas
                <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Button>
            </div>
          </div>

          <div className="relative lg:block">
            <div className="relative w-full max-w-[500px] mx-auto">
              {/* Efectos de blob animados */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              
              {/* Imagen principal con marco decorativo y botón de play */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] transform rotate-6"></div>
                <div className="relative bg-white p-3 rounded-[2rem] shadow-xl transform -rotate-3 transition-transform hover:rotate-0 duration-500 border-4 border-white">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] opacity-50"></div>
                  <div className="relative">
                    <img
                      src={heroImage}
                      alt="SIM Card para Europa"
                      className="w-full aspect-[4/3] object-cover rounded-[1.75rem] transform hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* Botón de play */}
                    <button
                      onClick={() => setVideoOpen(true)}
                      className="absolute inset-0 flex items-center justify-center group/play"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg transform scale-110 group-hover/play:scale-125 transition-transform duration-300"></div>
                        <div className="relative bg-white/90 p-4 rounded-full shadow-lg transform group-hover/play:scale-110 transition-all duration-300">
                          <Play className="w-8 h-8 text-primary fill-current" />
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg transform rotate-3">
                    <p className="text-sm font-medium text-gray-900">¡Cobertura en toda Europa! 🌍</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-xl animate-float delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg animate-float delay-500" />
      <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-l from-secondary/15 to-primary/15 rounded-full blur-lg animate-float delay-700" />

      {/* Modal de video */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/NoxUM4gJMrI?si=2sbISAVK6xe04IlZ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}