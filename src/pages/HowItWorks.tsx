import { MainLayout } from "@/components/layouts/MainLayout"
import { Header } from "@/components/Header"
import { HowItWorks as HowItWorksContent } from "@/components/HowItWorks"
import { useEffect } from "react"

export default function HowItWorks() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <MainLayout>
      <Header />
      <HowItWorksContent />
    </MainLayout>
  )
}