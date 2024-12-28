import { Button } from "@/components/ui/button";
import { Smartphone, HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { compatibleDevices } from "@/data/compatibleDevices";

export function SimHero() {
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
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                <span className="text-primary">SIM Física</span> para tu viaje a Europa
              </h1>
              <p className="text-lg font-semibold leading-8 text-gray-800 backdrop-blur-sm bg-white/30 p-4 rounded-xl">
                Recibe tu SIM física en la comodidad de tu hogar y disfruta de internet de alta velocidad en toda Europa.
              </p>
              <p className="text-base leading-7 text-gray-600 backdrop-blur-sm bg-white/30 p-4 rounded-xl">
                Envío a todo México, activación sencilla y soporte en español 24/7. La manera más confiable de mantenerte conectado en Europa.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <HelpCircle className="h-4 w-4" />
                      ¿Cómo funciona?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>¿Cómo funciona la SIM física?</DialogTitle>
                      <DialogDescription>
                        <div className="space-y-4 mt-4">
                          <p>
                            La SIM física es una tarjeta que se inserta en tu dispositivo para conectarte a internet en Europa.
                          </p>
                          <div className="space-y-2">
                            <h4 className="font-semibold">Proceso sencillo:</h4>
                            <ol className="list-decimal pl-5 space-y-1">
                              <li>Compra tu SIM</li>
                              <li>Recíbela en tu domicilio</li>
                              <li>Insértala en tu dispositivo al llegar a Europa</li>
                              <li>¡Listo! Comienza a navegar</li>
                            </ol>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold">Ventajas:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Compatible con todos los dispositivos</li>
                              <li>No requiere configuración especial</li>
                              <li>Incluye adaptadores para todos los tamaños</li>
                              <li>Activación automática al llegar a Europa</li>
                            </ul>
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
                        La SIM física es compatible con todos los dispositivos móviles
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
                                    <span className="text-green-500 text-sm font-medium">
                                      Compatible
                                    </span>
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
              </div>
            </div>
          </div>

          <div className="relative lg:block">
            <div className="relative w-full max-w-[500px] mx-auto">
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
                    src="https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80"
                    alt="SIM Card para Europa"
                    className="w-full aspect-[4/3] object-cover rounded-[1.75rem] transform hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg transform rotate-3">
                    <p className="text-sm font-medium text-gray-900">¡Envío gratis a todo México! 🚚</p>
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
    </div>
  );
}