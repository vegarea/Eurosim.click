import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSiteImages } from "@/hooks/useSiteImages";

export function InternationalCalling() {
  const isMobile = useIsMobile();
  const { data: images } = useSiteImages();
  const internationalImage = images?.find(img => img.id === 3)?.currentUrl;

  return (
    <section className="py-12 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Imagen */}
              <div className="h-64 md:h-full bg-gray-100 min-h-[300px]">
                {internationalImage ? (
                  <img 
                    src={internationalImage} 
                    alt="Llamadas internacionales" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>Imagen pendiente</span>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ¡Incluye 300 minutos
                  </h3>
                </div>
                
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                  para llamadas internacionales!
                </h4>

                <div className="prose prose-lg">
                  <p className="text-gray-600 leading-relaxed">
                    A diferencia de otros eSIMs en el mercado, el nuestro te permite realizar llamadas internacionales y obtener un número europeo, brindándote una conectividad global sin complicaciones.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Con nuestro eSIM, disfrutarás de la libertad de gestionar múltiples perfiles y planes de datos desde un solo dispositivo, ideal para viajes y negocios sin las tarifas de roaming tradicionales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}