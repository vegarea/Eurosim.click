import { MainLayout } from "@/components/layouts/MainLayout"
import { Header } from "@/components/Header"
import { FrequentQuestions } from "@/components/FrequentQuestions"
import { useEffect } from "react"

export default function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <MainLayout>
      <Header />
      <FrequentQuestions />
    </MainLayout>
  )
}