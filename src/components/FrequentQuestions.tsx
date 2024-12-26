import { ChevronRight, MessageCircle, Globe2, CreditCard, Smartphone, Clock } from "lucide-react";
import { motion } from "framer-motion";

const questions = [
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
  }
];

export function FrequentQuestions() {
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
            Preguntas <span className="text-primary">frecuentes</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Resolvemos tus dudas sobre el servicio de eSIM para que viajes con total tranquilidad
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {questions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className={`${item.bgColor} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/10 backdrop-blur-sm`}>
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                      <div className="relative p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl backdrop-blur-sm">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <ChevronRight className="w-5 h-5 text-primary transform transition-transform group-hover:translate-x-1" />
                        <h3 className="text-xl font-semibold text-primary">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 pl-7">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}