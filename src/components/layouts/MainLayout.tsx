import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { TrackingScripts } from "../tracking/TrackingScripts"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TrackingScripts />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}