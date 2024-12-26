import { Check, Smartphone, CreditCard, Mail, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { compatibleDevices } from "@/data/compatibleDevices";
import { motion } from "framer-motion";

const timelineItems = [
  {
    icon: Smartphone,
    title: "Verifica compatibilidad",
    description: "Asegúrate de que tu dispositivo sea compatible con eSIM antes de realizar la compra. La mayoría de smartphones modernos son compatibles.",
    highlight: true
  },
  {
    icon: CreditCard,
    title: "Elige tu plan",
    description: "Selecciona el plan que mejor se adapte a tus necesidades de datos y duración del viaje. Podrás elegir la fecha de activación que prefieras."
  },
  {
    icon: Mail,
    title: "Recibe email de confirmación",
    description: "Recibirás un email confirmando tu compra y la fecha de activación seleccionada. Te mantendremos informado del estado de tu eSIM."
  },
  {
    icon: QrCode,
    title: "Activa tu eSIM",
    description: "24 horas antes de tu fecha de activación, recibirás el código QR por email. Escanéalo desde los ajustes de tu teléfono y ¡listo para usar!"
  }
];

export function HowItWorks() {
  return (
    <section className="py-12 bg-gradient-to-br from-white to-brand-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-gray-600">
            Obtén tu eSIM en 4 sencillos pasos
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Línea conectora */}
                {index < timelineItems.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30" />
                )}
                
                <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow relative z-10">
                  {/* Número del paso */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="mb-3 flex justify-center">
                    <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-semibold text-gray-900 mb-1 text-center">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {item.description}
                  </p>
                  
                  {item.highlight && (
                    <div className="mt-3 flex justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-xs gap-1">
                            <Smartphone className="h-3 w-3" />
                            Verifica compatibilidad
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
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}