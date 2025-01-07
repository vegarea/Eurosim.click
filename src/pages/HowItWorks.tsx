import { MainLayout } from "@/components/layouts/MainLayout"
import { Header } from "@/components/Header"
import { HowItWorks as HowItWorksContent } from "@/components/HowItWorks"

export default function HowItWorks() {
  return (
    <MainLayout>
      <Header />
      <HowItWorksContent />
    </MainLayout>
  )
}