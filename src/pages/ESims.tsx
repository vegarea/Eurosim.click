import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { ArrowRight, Smartphone, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { compatibleDevices } from "@/data/compatibleDevices";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ESims() {
  const simCards = [
    {
      type: "esim" as const,
      title: "eSIM S",
      description: "8GB Europa / 80GB España",
      price: 690,
      features: [
        "8GB datos en toda Europa",
        "80GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "Activación inmediata",
        "30 días de validez",
        "Hotspot incluido"
      ]
    },
    {
      type: "esim" as const,
      title: "eSIM M",
      description: "12GB Europa / 120GB España",
      price: 790,
      features: [
        "12GB datos en toda Europa",
        "120GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "Activación inmediata",
        "30 días de validez",
        "Hotspot incluido"
      ]
    },
    {
      type: "esim" as const,
      title: "eSIM L",
      description: "16GB Europa / 160GB España",
      price: 890,
      features: [
        "16GB datos en toda Europa",
        "160GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "Activación inmediata",
        "30 días de validez",
        "Hotspot incluido"
      ]
    },
    {
      type: "esim" as const,
      title: "eSIM XL",
      description: "22GB Europa / 190GB España",
      price: 1090,
      features: [
        "22GB datos en toda Europa",
        "190GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "Activación inmediata",
        "30 días de validez",
        "Hotspot incluido"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <div className="relative min-h-screen overflow-hidden">
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
                eSIM para tu viaje a Europa
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">
                  Simple y Sin Complicaciones
                </span>
              </h1>
              <p className="mt-6 text-lg font-semibold leading-8 text-gray-800 max-w-2xl mx-auto backdrop-blur-sm bg-white/30 p-4 rounded-xl">
                Conéctate de manera instantánea y disfruta de internet de alta velocidad dondequiera que estés en Europa.
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600 max-w-2xl mx-auto backdrop-blur-sm bg-white/30 p-4 rounded-xl">
                Compra, recibe el QR en tu correo, y actívalo al instante. Así de fácil es tener el mejor internet en Europa, sin complicaciones ni sorpresas.
              </p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <HelpCircle className="h-4 w-4" />
                    ¿Qué es una eSIM?
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>¿Qué es una eSIM?</DialogTitle>
                    <DialogDescription>
                      <div className="space-y-4 mt-4">
                        <p>
                          Una eSIM (SIM electrónica) es una versión digital de la tarjeta SIM tradicional. No necesitas una tarjeta física, todo es digital.
                        </p>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Ventajas principales:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Activación instantánea</li>
                            <li>Sin necesidad de tarjeta física</li>
                            <li>Puedes tener múltiples líneas en un dispositivo</li>
                            <li>Más ecológico - sin plásticos</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold">¿Cómo funciona?</h4>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Compra tu eSIM</li>
                            <li>Recibe el código QR por email</li>
                            <li>Escanea el QR desde tu dispositivo</li>
                            <li>¡Listo! Tu línea está activada</li>
                          </ol>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    Verifica la compatibilidad
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Dispositivos Compatibles</DialogTitle>
                    <DialogDescription>
                      Verifica si tu dispositivo es compatible con eSIM
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <Accordion type="single" collapsible className="w-full">
                      {compatibleDevices.map((brand) => (
                        <AccordionItem key={brand.name} value={brand.name}>
                          <AccordionTrigger>{brand.name}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {brand.models.map((model) => (
                                <li
                                  key={model.name}
                                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                                >
                                  <span>{model.name}</span>
                                  {model.compatible ? (
                                    <span className="text-green-500 text-sm font-medium">
                                      Compatible
                                    </span>
                                  ) : (
                                    <span className="text-red-500 text-sm font-medium">
                                      No compatible
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </DialogContent>
              </Dialog>

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

      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {simCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <SimCard {...card} />
              </motion.div>
            ))}
          </div>

          <SimFeatures />
          <CountryCoverage />
        </div>
      </div>
    </div>
  );
}