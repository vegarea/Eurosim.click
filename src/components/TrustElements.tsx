import { Shield, Star, Clock, Globe2, Users, Headphones, CheckCircle, ChevronDown } from "lucide-react";
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

export function TrustElements() {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Garantía de Servicio",
      description: "Conexión confiable y soporte 24/7 durante tu viaje"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Experiencia Comprobada",
      description: "Miles de viajeros satisfechos por toda Europa"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Activación Rápida",
      description: "Comienza a navegar en minutos con eSIM o recibe tu SIM física antes de viajar"
    },
    {
      icon: <Globe2 className="w-8 h-8" />,
      title: "Cobertura Total",
      description: "Conectividad garantizada en 44 países y territorios europeos"
    }
  ];

  const stats = [
    {
      value: "10,000+",
      label: "Viajeros Conectados",
      icon: <Users className="w-6 h-6" />
    },
    {
      value: "34",
      label: "Países y Territorios",
      icon: <Globe2 className="w-6 h-6" />
    },
    {
      value: "24/7",
      label: "Soporte Técnico",
      icon: <Headphones className="w-6 h-6" />
    },
    {
      value: "100%",
      label: "Garantía de Servicio",
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  // Mapa de países con sus códigos ISO correspondientes
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          ¿Por qué Elegirnos?
        </h2>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl transform -rotate-2 group-hover:rotate-1 transition-transform" />
              <div className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-primary bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center space-y-2 group"
              >
                <div className="w-12 h-12 flex items-center justify-center text-primary bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="text-gray-600 text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de cobertura con acordeón */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-4 md:p-6 shadow-lg">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="coverage">
              <AccordionTrigger className="flex flex-col md:flex-row items-start md:items-center gap-2 text-lg md:text-xl font-semibold hover:no-underline p-2">
                <div className="flex items-center gap-2">
                  <span className="fi fi-eu w-6 h-6 rounded-sm shadow-sm"></span>
                  <span>Cobertura en Europa</span>
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({countries.length} países y territorios)
                  </span>
                </div>
                <div className="flex items-center gap-2 md:ml-auto text-sm font-normal text-primary hover:text-primary/80">
                  <span>Ver cobertura</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-primary transition-transform duration-200" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600 mb-4 text-sm px-2">
                  Navega sin preocupaciones en cualquiera de estos destinos:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 px-2">
                  {countries.map((country, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <span className={`fi fi-${country.code} w-5 h-5`}></span>
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
        </div>
      </div>
    </section>
  );
}
