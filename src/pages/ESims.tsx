import { Header } from "@/components/Header";
import { ProductButton } from "@/components/esim/ProductButton";
import { PlanDetails } from "@/components/esim/PlanDetails";
import { CommonFeatures } from "@/components/CommonFeatures";
import { SimFeatures } from "@/components/SimFeatures";
import { CountryCoverage } from "@/components/CountryCoverage";
import { PaymentSecurity } from "@/components/PaymentSecurity";
import { AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/database/products";

export default function ESims() {
  const isMobile = useIsMobile();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['esims'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'esim')
        .eq('status', 'active');
      
      if (error) throw error;
      return data as Product[];
    }
  });

  const [selectedPlan, setSelectedPlan] = useState<Product | null>(null);

  // Efecto para establecer el plan por defecto cuando los productos se cargan
  useEffect(() => {
    if (products.length > 0) {
      const defaultProduct = products.find(p => p.title === "E-SIM L");
      if (defaultProduct) {
        setSelectedPlan(defaultProduct);
      }
    }
  }, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              eSIM Europa
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conectividad instantánea en toda Europa. Activa tu eSIM en minutos y disfruta de internet de alta velocidad.
            </p>
          </div>

          {!isLoading && (
            <div className={`flex ${isMobile ? 'flex-col-reverse' : 'md:flex-row md:items-start md:space-x-6'} gap-4`}>
              <div className={`${isMobile ? 'w-full' : 'md:w-[45%]'} order-2 md:order-1`}>
                <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-1'} gap-2 md:gap-3`}>
                  {products.map((product) => (
                    <ProductButton
                      key={product.id}
                      product={product}
                      isSelected={selectedPlan?.id === product.id}
                      isPopular={product.title === "E-SIM L"}
                      onClick={() => setSelectedPlan(product)}
                    />
                  ))}
                </div>
              </div>

              <div className={`${isMobile ? 'w-full' : 'md:w-[55%]'} order-1 md:order-2 sticky top-4`}>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                  <AnimatePresence mode="wait">
                    {selectedPlan && (
                      <PlanDetails
                        key={selectedPlan.id}
                        product={selectedPlan}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          <CommonFeatures />
          <SimFeatures />
          <CountryCoverage />
          <PaymentSecurity />
        </div>
      </div>
    </div>
  );
}