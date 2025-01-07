import { FloatingChat } from "../chat/FloatingChat"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <FloatingChat />
    </div>
  )
}