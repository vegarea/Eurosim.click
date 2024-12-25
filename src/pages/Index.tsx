import { HomeHero } from "@/components/HomeHero";
import { TrustElements } from "@/components/TrustElements";
import { SimOptions } from "@/components/SimOptions";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-brand-50/50">
      <HomeHero />
      <SimOptions />
      <TrustElements />
    </div>
  );
};

export default Index;