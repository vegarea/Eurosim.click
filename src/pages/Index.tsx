import { HomeHero } from "@/components/HomeHero";
import { TrustElements } from "@/components/TrustElements";
import { SimOptions } from "@/components/SimOptions";
import { Testimonials } from "@/components/Testimonials";
import { PaymentSecurity } from "@/components/PaymentSecurity";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
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