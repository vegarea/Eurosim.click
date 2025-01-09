import { HomeHero } from "@/components/HomeHero";
import { TrustElements } from "@/components/TrustElements";
import { SimOptions } from "@/components/SimOptions";
import { Testimonials } from "@/components/Testimonials";
import { PaymentSecurity } from "@/components/PaymentSecurity";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/layouts/MainLayout";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <MainLayout>
      <SEO 
        title="Internet en Europa | SIM y eSIM para viajar"
        description="Viaja por Europa con internet de alta velocidad. SIM y eSIM con cobertura en toda la UE. Sin contratos, sin complicaciones. ¡Conéctate desde el primer minuto!"
        keywords="sim europa, esim europa, internet europa, roaming europa, datos moviles europa"
      />
      <div className="min-h-screen bg-gradient-to-br from-white to-brand-50/50">
        <Header />
        <HomeHero />
        <SimOptions />
        <TrustElements />
        <Testimonials />
        <PaymentSecurity />
      </div>
    </MainLayout>
  );
};

export default Index;