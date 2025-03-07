import { ChevronRight, MessageCircle, Globe2, CreditCard, Smartphone, Clock, Wifi, Map, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const esimQuestions = [
  {
    icon: MessageCircle,
    title: "¿Podré seguir usando mi WhatsApp actual?",
    answer: "¡Sí! Tu WhatsApp seguirá funcionando normalmente con tu número actual. La eSIM solo se usa para datos, por lo que tus aplicaciones de mensajería seguirán vinculadas a tu número principal.",
    bgColor: "bg-primary/5"
  },
  {
    icon: Globe2,
    title: "¿Funciona en todos los países de Europa?",
    answer: "Nuestra eSIM funciona en todos los países de la Unión Europea, además de Reino Unido, Suiza, Noruega e Islandia. Tendrás la misma cobertura en todos estos países sin costos adicionales.",
    bgColor: "bg-secondary/5"
  },
  {
    icon: CreditCard,
    title: "¿Cómo se realiza el pago?",
    answer: "Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express), así como PayPal. El pago es seguro y se procesa instantáneamente.",
    bgColor: "bg-primary/5"
  },
  {
    icon: Smartphone,
    title: "¿Qué pasa si mi teléfono no es compatible?",
    answer: "Si tu dispositivo no es compatible con eSIM, te recomendamos nuestra SIM física tradicional. Ofrecemos envío gratuito a todo México y los mismos planes de datos.",
    bgColor: "bg-secondary/5"
  },
  {
    icon: Clock,
    title: "¿Cuánto tiempo tarda en activarse?",
    answer: "La eSIM se activa instantáneamente después de escanear el código QR. Recibirás el código QR por email inmediatamente después de tu compra, pero puedes elegir la fecha de inicio que prefieras.",
    bgColor: "bg-primary/5"
  },
  {
    icon: Phone,
    title: "¿Necesito configuración especial?",
    answer: "No, la configuración es muy sencilla. Solo necesitas escanear el código QR que te enviamos y seguir unos simples pasos en tu teléfono. Además, te proporcionamos una guía detallada.",
    bgColor: "bg-secondary/5"
  }
];

const simQuestions = [
  {
    icon: Clock,
    title: "¿Cuánto tarda en llegar mi SIM física?",
    answer: "Realizamos envíos a todo México. El tiempo de entrega estándar es de 2-3 días hábiles. También ofrecemos opciones de envío express para entregas en 24 horas en ciudades principales.",
    bgColor: "bg-primary/5"
  },
  {
    icon: Smartphone,
    title: "¿Es compatible con cualquier teléfono?",
    answer: "Sí, nuestra SIM física es compatible con cualquier teléfono desbloqueado que acepte tarjetas SIM estándar, micro-SIM o nano-SIM. Incluimos adaptadores para todos los tamaños.",
    bgColor: "bg-secondary/5"
  },
  {
    icon: MessageCircle,
    title: "¿Puedo hacer llamadas locales en Europa?",
    answer: "Sí, nuestras SIM físicas incluyen minutos para llamadas locales dentro de Europa y también para llamar a otros países europeos. Las llamadas a México tienen costo adicional.",
    bgColor: "bg-primary/5"
  },
  {
    icon: CreditCard,
    title: "¿Hay costo de envío?",
    answer: "El envío estándar es gratuito a todo México. Para envíos express hay un costo adicional que varía según la ubicación y la urgencia de la entrega.",
    bgColor: "bg-secondary/5"
  },
  {
    icon: Phone,
    title: "¿Cómo activo mi SIM física?",
    answer: "La SIM viene preactivada. Solo necesitas insertarla en tu teléfono y encenderlo. En algunos casos, deberás seleccionar la red manualmente en la configuración del teléfono.",
    bgColor: "bg-primary/5"
  },
  {
    icon: Globe2,
    title: "¿Puedo compartir los datos con otros dispositivos?",
    answer: "Sí, puedes usar tu teléfono como punto de acceso WiFi para compartir tu conexión con otros dispositivos sin costo adicional, sujeto al límite de datos de tu plan.",
    bgColor: "bg-secondary/5"
  }
];

const coverageQuestions = [
  {
    icon: Wifi,
    title: "¿Qué velocidad de internet tendré?",
    answer: "Ofrecemos velocidades 4G/LTE en toda Europa, con velocidades de hasta 100 Mbps. En zonas con cobertura 5G, podrás acceder a esta red sin costo adicional.",
    bgColor: "bg-primary/5"
  },
  {
    icon: Map,
    title: "¿Hay zonas sin cobertura?",
    answer: "Nuestra red cubre más del 99% de las áreas pobladas en Europa. En zonas rurales muy remotas, la señal puede variar, pero siempre tendrás al menos conexión 3G.",
    bgColor: "bg-secondary/5"
  },
  {
    icon: Globe2,
    title: "¿Funciona en cruceros o aviones?",
    answer: "La cobertura en cruceros y aviones depende de si estos tienen acuerdos con operadores terrestres. Recomendamos verificar con la compañía de viaje específica.",
    bgColor: "bg-primary/5"
  },
  {
    icon: Clock,
    title: "¿Los datos expiran?",
    answer: "Los datos tienen una validez según el plan que elijas (7, 14 o 30 días). Una vez activada la SIM, el período de uso comienza y los datos no utilizados expiran al final del período.",
    bgColor: "bg-secondary/5"
  },
  {
    icon: Smartphone,
    title: "¿Qué pasa si me quedo sin datos?",
    answer: "Puedes comprar datos adicionales en cualquier momento desde nuestra plataforma. La recarga se aplica instantáneamente sin necesidad de cambiar la SIM.",
    bgColor: "bg-primary/5"
  },
  {
    icon: MessageCircle,
    title: "¿Funciona con todas las aplicaciones?",
    answer: "Sí, nuestro servicio es compatible con todas las aplicaciones que requieren internet: redes sociales, mensajería, mapas, streaming, etc. No hay restricciones de contenido.",
    bgColor: "bg-secondary/5"
  }
];

export function FrequentQuestions() {
  const isMobile = useIsMobile();

  return (
    <section className="py-24 md:py-24 bg-gradient-to-br from-white to-brand-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 md:mb-6"
          >
            Preguntas <span className="text-primary">frecuentes</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Resolvemos tus dudas sobre nuestros servicios para que viajes con total tranquilidad
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="esim" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 bg-muted/50 p-1 mb-8">
              <TabsTrigger 
                value="esim"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                eSIM
              </TabsTrigger>
              <TabsTrigger 
                value="sim"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                SIM Física
              </TabsTrigger>
              <TabsTrigger 
                value="coverage"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Cobertura y Datos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="esim" className="space-y-3 md:space-y-6">
              {esimQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`${item.bgColor} p-4 md:p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 backdrop-blur-sm`}>
                    <div className="flex items-start gap-3 md:gap-4">
                      {!isMobile && (
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                          <div className="relative p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl backdrop-blur-sm">
                            <item.icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isMobile && (
                            <item.icon className="w-5 h-5 text-primary shrink-0" />
                          )}
                          <h3 className="text-lg md:text-xl font-semibold text-primary">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 md:pl-7">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="sim" className="space-y-3 md:space-y-6">
              {simQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`${item.bgColor} p-4 md:p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 backdrop-blur-sm`}>
                    <div className="flex items-start gap-3 md:gap-4">
                      {!isMobile && (
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                          <div className="relative p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl backdrop-blur-sm">
                            <item.icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isMobile && (
                            <item.icon className="w-5 h-5 text-primary shrink-0" />
                          )}
                          <h3 className="text-lg md:text-xl font-semibold text-primary">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 md:pl-7">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="coverage" className="space-y-3 md:space-y-6">
              {coverageQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`${item.bgColor} p-4 md:p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 backdrop-blur-sm`}>
                    <div className="flex items-start gap-3 md:gap-4">
                      {!isMobile && (
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                          <div className="relative p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl backdrop-blur-sm">
                            <item.icon className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isMobile && (
                            <item.icon className="w-5 h-5 text-primary shrink-0" />
                          )}
                          <h3 className="text-lg md:text-xl font-semibold text-primary">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 md:pl-7">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}