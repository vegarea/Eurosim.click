import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Product } from "@/types/database/products"
import { ProductButton } from "@/components/esim/ProductButton"
import { PlanDetails } from "@/components/esim/PlanDetails"
import { TrustElements } from "@/components/TrustElements"
import { CountryCoverage } from "@/components/CountryCoverage"
import { CommonFeatures } from "@/components/CommonFeatures"
import { InternationalCalling } from "@/components/InternationalCalling"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ESimHero } from "@/components/ESimHero"
import { ESimFAQ } from "@/components/esim/ESimFAQ"

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
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
        <Header />
        
        <main>
          <ESimHero />

          <section className="py-16 md:py-24 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">
                Elige tu plan eSIM
              </h2>

              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6 md:gap-8 items-start">
                  {/* Columna de botones de productos */}
                  <div className="flex flex-col gap-4">
                    {products.map((product) => (
                      <ProductButton
                        key={product.id}
                        product={product}
                        isSelected={selectedPlan?.id === product.id}
                        onClick={() => setSelectedPlan(product)}
                      />
                    ))}
                  </div>

                  {/* Columna de detalles del producto */}
                  <div className="sticky top-4">
                    {selectedPlan && (
                      <PlanDetails
                        product={selectedPlan}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto max-w-6xl px-4">
            <CountryCoverage />
            <CommonFeatures />
            <InternationalCalling />
            <TrustElements />
            <ESimFAQ />
          </div>
        </main>
      </div>
    </MainLayout>
  )
}