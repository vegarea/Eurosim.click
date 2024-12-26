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
    highlight: true,
    bgColor: "bg-primary/5"
  },
  {
    icon: CreditCard,
    title: "Elige tu plan",
    description: "Selecciona el plan que mejor se adapte a tus necesidades de datos y duración del viaje. Podrás elegir la fecha de activación que prefieras.",
    bgColor: "bg-secondary/5"
  },
  {
    icon: Mail,
    title: "Recibe email de confirmación",
    description: "Recibirás un email confirmando tu compra y la fecha de activación seleccionada. Te mantendremos informado del estado de tu eSIM.",
    bgColor: "bg-primary/5"
  },
  {
    icon: QrCode,
    title: "Activa tu eSIM",
    description: "24 horas antes de tu fecha de activación, recibirás el código QR por email. Escanéalo desde los ajustes de tu teléfono y ¡listo para usar!",
    bgColor: "bg-secondary/5"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-brand-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6"
          >
            ¿Cómo <span className="text-primary">funciona</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Obtén tu eSIM en <span className="font-semibold text-primary">4 simples pasos</span> y comienza a disfrutar de conectividad instantánea.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Línea vertical del timeline con gradiente */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary rounded-full" />

            {/* Items del timeline */}
            <div className="space-y-16">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-start ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Punto del timeline con animación de pulso */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-primary">
                    <div className="absolute w-full h-full rounded-full bg-primary/20 animate-ping" />
                    <item.icon className="w-4 h-4 text-primary relative z-10" />
                  </div>

                  {/* Contenido con efectos hover */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}>
                    <div className={`${item.bgColor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 backdrop-blur-sm`}>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
                        Paso {index + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                      
                      {item.highlight && (
                        <div className="mt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="gap-2 hover:bg-primary/5">
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
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}