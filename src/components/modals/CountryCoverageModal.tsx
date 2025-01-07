import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CountryCoverageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CountryCoverageModal({ isOpen, onClose }: CountryCoverageModalProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto md:h-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Globe className="h-5 w-5 text-brand-500" />
            <span>Cobertura en Europa</span>
            <span className="text-sm font-normal text-gray-500">
              ({countries.length} países y territorios)
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <p className="text-gray-600 mb-4 text-sm">
            Navega sin preocupaciones en cualquiera de estos destinos:
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {countries.map((country) => (
              <TooltipProvider key={country.code}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <span className={`fi fi-${country.code} rounded-sm shadow-sm`} />
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
        </div>
      </DialogContent>
    </Dialog>
  );
}