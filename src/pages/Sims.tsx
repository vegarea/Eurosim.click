import { Header } from "@/components/Header";
import { SimCard } from "@/components/SimCard";
import { Globe2, Signal, Shield, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sims = () => {
  const features = [
    "Cobertura en toda la Unión Europea",
    "Entrega a domicilio en todo México",
    "Activación sencilla y rápida",
    "Soporte técnico en español 24/7",
  ];

  const simCards = [
    {
      type: "physical" as const,
      title: "Prepago XL",
      description: "16GB Europa / 160GB España",
      price: 890,
      features: [
        "16GB datos en toda Europa",
        "160GB exclusivo España",
        "Velocidad 5G/4G/3G+",
        "SIM card incluida",
        "30 días de validez",
        "Hotspot incluido"
      ]
    },
    {
      type: "physical" as const,
      title: "Prepago XXL",
      description: "22GB Europa / 190GB España",
      price: 1090,
      features: [
        "22GB datos en toda Europa",
        "190GB exclusivo España",
        "300 min llamadas internacionales",
        "Velocidad 5G/4G/3G+",
        "SIM card incluida",
        "30 días de validez"
      ]
    }
  ];

  // Lista de países con cobertura
  const countries = [
    { name: "Alemania", code: "de" },
    { name: "Austria", code: "at" },
    { name: "Bélgica", code: "be" },
    { name: "Bulgaria", code: "bg" },
    { name: "Chipre", code: "cy" },
    { name: "Croacia", code: "hr" },
    { name: "Dinamarca", code: "dk" },
    { name: "Eslovaquia", code: "sk" },
    { name: "Eslovenia", code: "si" },
    { name: "España", code: "es" },
    { name: "Estonia", code: "ee" },
    { name: "Finlandia", code: "fi" },
    { name: "Francia", code: "fr" },
    { name: "Grecia", code: "gr" },
    { name: "Holanda", code: "nl" },
    { name: "Hungría", code: "hu" },
    { name: "Irlanda", code: "ie" },
    { name: "Islandia", code: "is" },
    { name: "Italia", code: "it" },
    { name: "Letonia", code: "lv" },
    { name: "Liechtenstein", code: "li" },
    { name: "Lituania", code: "lt" },
    { name: "Luxemburgo", code: "lu" },
    { name: "Malta", code: "mt" },
    { name: "Noruega", code: "no" },
    { name: "Polonia", code: "pl" },
    { name: "Portugal", code: "pt" },
    { name: "Reino Unido", code: "gb" },
    { name: "República Checa", code: "cz" },
    { name: "Rumania", code: "ro" },
    { name: "San Marino", code: "sm" },
    { name: "Suecia", code: "se" },
    { name: "Suiza", code: "ch" },
    { name: "Vaticano", code: "va" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50/50">
      <Header />
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 to-transparent pointer-events-none h-96" />
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-brand-600 bg-clip-text text-transparent">
                SIM Física para Europa
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Mantente conectado en toda la Unión Europea con nuestros planes prepago
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
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

            {/* Sección de cobertura con acordeón */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-16"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="coverage">
                  <AccordionTrigger className="flex items-center gap-2 text-xl font-semibold hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span className="fi fi-eu w-6 h-6 rounded-sm shadow-sm"></span>
                      <span>Cobertura en Europa</span>
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        ({countries.length} países y territorios)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-auto text-sm font-normal text-primary hover:text-primary/80">
                      <span>Ver cobertura</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform duration-200" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 mb-4 text-sm">
                      Navega sin preocupaciones en cualquiera de estos destinos:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                      {countries.map((country, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                <span className={`fi fi-${country.code}`}></span>
                                <span className="text-sm text-gray-700">{country.name}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cobertura garantizada</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <Globe2 className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cobertura Total</h3>
                <p className="text-gray-600">
                  Navega sin preocupaciones en cualquier país de la UE
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <Signal className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Red 4G/5G</h3>
                <p className="text-gray-600">
                  Conexión de alta velocidad en las principales redes europeas
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Garantía de Servicio</h3>
                <p className="text-gray-600">
                  Soporte 24/7 en español y garantía de devolución
                </p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">¿Por qué elegir nuestra SIM?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sims;