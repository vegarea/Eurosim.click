import { Header } from "@/components/Header"
import { SimHero } from "@/components/SimHero"
import { CountryCoverage } from "@/components/CountryCoverage"
import { DeliveryBenefits } from "@/components/DeliveryBenefits"
import { SimFeatures } from "@/components/SimFeatures"
import { TrustElements } from "@/components/TrustElements"
import { MainLayout } from "@/components/layouts/MainLayout"
import { SimOptions } from "@/components/SimOptions"
import { InternationalCalling } from "@/components/InternationalCalling"
import { ActivationDateInfo } from "@/components/esim/ActivationDateInfo"

export default function Sims() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white">
        <Header />
        
        <main>
          <SimHero />
          <div className="container mx-auto max-w-6xl px-4">
            <SimOptions />
            <CountryCoverage />
            <DeliveryBenefits />
            <InternationalCalling />
            <ActivationDateInfo />
            <SimFeatures />
            <TrustElements />
          </div>
        </main>
      </div>
    </MainLayout>
  )
}