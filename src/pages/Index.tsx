import { HomeHero } from "@/components/HomeHero";
import { TrustElements } from "@/components/TrustElements";
import { SimOptions } from "@/components/SimOptions";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-50/50">
      <HomeHero />
      <SimOptions />
      <TrustElements />
      <Stats />
      <Testimonials />
    </div>
  );
};

export default Index;