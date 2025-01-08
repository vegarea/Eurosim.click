import { Check, Smartphone, CreditCard, Mail, QrCode, Package, Network } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: Smartphone,
    title: "Elige tu eSIM o SIM física",
    description: "Escoge el plan que mejor se adapte a tus necesidades de datos y conectividad durante tu viaje en Europa.",
    bgColor: "bg-primary/5"
  },
  {
    icon: CreditCard,
    title: "Compra fácil y segura",
    description: "Completa tu compra en línea en pocos minutos. Recibirás un correo de confirmación con toda la información.",
    bgColor: "bg-secondary/5"
  },
  {
    icon: QrCode,
    title: "Recibe tu QR o SIM física",
    description: "Para eSIM: Recibirás un código QR un día antes de la fecha de activación. Para SIM física: Se envía a tu domicilio (disponible únicamente en México).",
    bgColor: "bg-primary/5"
  },
  {
    icon: Network,
    title: "Conéctate y viaja sin preocupaciones",
    description: "Activa tu SIM o eSIM siguiendo nuestras instrucciones y disfruta de conectividad confiable durante todo tu viaje.",
    bgColor: "bg-secondary/5"
  }
]

const benefits = [
  {
    icon: Network,
    title: "Confiabilidad",
    description: "Red de los operadores más grandes de Europa."
  },
  {
    icon: Smartphone,
    title: "Facilidad",
    description: "Compra rápida, activación en minutos."
  },
  {
    icon: CreditCard,
    title: "Ahorro",
    description: "Precios más bajos que las tarifas de roaming tradicionales."
  }
]

export function HowItWorks() {
  return (
    <div className="py-12 md:py-24">
      {/* Sección de pasos */}
      <div className="container mx-auto px-4 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            ¿Cómo <span className="text-primary">funciona</span>?
          </h1>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`${step.bgColor} p-6 rounded-xl h-full border border-primary/10 hover:shadow-lg transition-all duration-300`}>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sección de proveedores */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Los mejores proveedores de conectividad
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              En Eurosim, trabajamos como intermediarios para ofrecerte las mejores opciones de conectividad móvil en Europa. 
              Seleccionamos exclusivamente SIMs y eSIMs de operadores reconocidos como Vodafone, Orange, y otros líderes en telecomunicaciones.
            </p>
            <p className="text-lg text-gray-600">
              Esto garantiza que obtendrás una conexión de alta calidad en toda Europa, con cobertura y velocidades óptimas.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-lg border border-primary/10">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">¿Qué significa esto para ti?</h3>
            <p className="text-gray-600 mb-6">
              Al recibir tu producto, notarás que es provisto por estos operadores, ya que utilizamos sus redes para asegurarte la mejor experiencia. 
              Nuestro trabajo es asegurarnos de que tengas acceso a estos servicios de forma sencilla, segura y al mejor precio.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de beneficios */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            ¿Por qué elegirnos?
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}