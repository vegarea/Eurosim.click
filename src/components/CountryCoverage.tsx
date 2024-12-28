import { ChevronDown } from "lucide-react";
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

interface CountryCoverageProps {
  defaultOpen?: boolean;
}

export function CountryCoverage({ defaultOpen = false }: CountryCoverageProps) {
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg mb-16"
    >
      <Accordion 
        type="single" 
        collapsible 
        className="w-full"
        defaultValue={defaultOpen ? "coverage" : undefined}
      >
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
  );
}