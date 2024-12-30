import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Product } from "@/types/database/products"
import { ProductButton } from "@/components/esim/ProductButton"
import { PlanDetails } from "@/components/esim/PlanDetails"
import { Header } from "@/components/Header"
import { ESimHero } from "@/components/ESimHero"
import { TrustElements } from "@/components/TrustElements"
import { HowItWorks } from "@/components/HowItWorks"
import { FrequentQuestions } from "@/components/FrequentQuestions"
import { CountryCoverage } from "@/components/CountryCoverage"
import { CommonFeatures } from "@/components/CommonFeatures"

export default function ESims() {
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(null)

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['esim-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('type', 'esim')
        .eq('status', 'active')
        .order('price', { ascending: true });

      if (error) throw error;
      return data as Product[];
    }
  })

  useEffect(() => {
    if (products.length > 0 && !selectedPlan) {
      setSelectedPlan(products[1]) // Seleccionar el plan medio por defecto
    }
  }, [products, selectedPlan])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
      <Header />
      
      <main>
        <ESimHero />

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              Elige tu plan eSIM
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <ProductButton
                  key={product.id}
                  product={product}
                  isSelected={selectedPlan?.id === product.id}
                  onClick={() => setSelectedPlan(product)}
                />
              ))}
            </div>

            {selectedPlan && (
              <PlanDetails
                product={selectedPlan}
              />
            )}
          </div>
        </section>

        <CommonFeatures />
        <TrustElements />
        <HowItWorks />
        <CountryCoverage />
        <FrequentQuestions />
      </main>
    </div>
  )
}