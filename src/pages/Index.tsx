import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SimQuiz from "@/components/SimQuiz";
import { ArrowRight, Smartphone, Globe2, Zap, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const comparisonData = [
    {
      feature: "Instalación",
      physical: "Inserción manual de la tarjeta SIM",
      esim: "Escaneo de QR code o activación remota",
    },
    {
      feature: "Tiempo de activación",
      physical: "24-72 horas (envío físico)",
      esim: "Inmediata",
    },
    {
      feature: "Compatibilidad",
      physical: "Todos los dispositivos",
      esim: "Dispositivos modernos compatibles con eSIM",
    },
    {
      feature: "Planes disponibles",
      physical: "20GB o 30GB",
      esim: "8GB hasta 25GB",
    },
    {
      feature: "Ideal para",
      physical: "Viajeros con dispositivos antiguos o que prefieren método tradicional",
      esim: "Viajeros que necesitan conexión inmediata o tienen múltiples destinos",
    }
  ];

  const faqs = [
    {
      question: "¿Qué es una eSIM?",
      answer: "Una eSIM es una SIM digital que se instala directamente en tu dispositivo sin necesidad de una tarjeta física. Funciona exactamente igual que una SIM tradicional pero de forma virtual."
    },
    {
      question: "¿Cómo sé si mi dispositivo es compatible con eSIM?",
      answer: "La mayoría de smartphones modernos (iPhone XS o posterior, Samsung S20 o posterior, Google Pixel 2 o posterior) son compatibles con eSIM. Puedes verificar en los ajustes de tu dispositivo o en nuestro verificador de compatibilidad."
    },
    {
      question: "¿Cuál es más conveniente para mi viaje?",
      answer: "Si tu dispositivo es compatible con eSIM y necesitas conexión inmediata, la eSIM es tu mejor opción. Si prefieres el método tradicional o tu dispositivo no es compatible con eSIM, la SIM física es la elección correcta."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-50/50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-grid-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-transparent pointer-events-none" />
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12 relative">
        {/* Logo y Hero Section */}
        <div className="text-center mb-16">
          <img 
            src="logo.png" 
            alt="EuroSim Logo" 
            className="h-24 mx-auto mb-8 animate-float"
          />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Internet en Europa
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Mantente conectado durante tu viaje con nuestras soluciones de SIM para Europa
          </p>
          
          {/* Quiz Modal Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="animate-pulse hover:animate-none">
                ¿No sabes qué SIM necesitas? Descúbrelo aquí
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <SimQuiz />
            </DialogContent>
          </Dialog>
        </div>

        {/* Opciones principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* SIM Física */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl" />
            <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
              <Smartphone className="w-12 h-12 text-primary mb-6" />
              <h2 className="text-2xl font-bold mb-4">SIM Física</h2>
              <p className="text-gray-600 mb-6">
                Recibe tu SIM en tu domicilio antes de viajar, perfecta para teléfonos sin eSIM.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <Zap className="w-5 h-5 text-primary mr-2" />
                  Envío a domicilio en 72hrs
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="w-5 h-5 text-primary mr-2" />
                  20GB o 30GB disponibles
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="w-5 h-5 text-primary mr-2" />
                  Activación programada
                </li>
              </ul>
              <Button className="w-full">
                Ver planes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* eSIM */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-50 blur-xl group-hover:opacity-75 transition-opacity rounded-3xl" />
            <div className="relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
              <Globe2 className="w-12 h-12 text-secondary mb-6" />
              <h2 className="text-2xl font-bold mb-4">eSIM</h2>
              <p className="text-gray-600 mb-6">
                Recibe tu eSIM al instante por email, ideal para teléfonos compatibles.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <Zap className="w-5 h-5 text-secondary mr-2" />
                  Activación instantánea
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="w-5 h-5 text-secondary mr-2" />
                  8GB hasta 25GB disponibles
                </li>
                <li className="flex items-center text-gray-600">
                  <Zap className="w-5 h-5 text-secondary mr-2" />
                  Instalación por QR
                </li>
              </ul>
              <Button variant="secondary" className="w-full">
                Ver planes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Nueva sección de comparación detallada */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Comparativa Detallada
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Característica</TableHead>
                  <TableHead className="w-1/3">SIM Física</TableHead>
                  <TableHead className="w-1/3">eSIM</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.feature}</TableCell>
                    <TableCell>{item.physical}</TableCell>
                    <TableCell>{item.esim}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Sección de FAQs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Preguntas Frecuentes
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-xl shadow-lg p-6">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Sección de beneficios */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Cobertura en toda Europa",
                description: "Red de alta velocidad en todos los países de la UE"
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Activación Simple",
                description: "Proceso sencillo y rápido para empezar a navegar"
              },
              {
                icon: <Globe2 className="w-8 h-8" />,
                title: "Soporte 24/7",
                description: "Estamos aquí para ayudarte durante todo tu viaje"
              }
            ].map((benefit, index) => (
              <div key={index} className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
