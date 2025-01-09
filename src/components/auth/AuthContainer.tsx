import { LogoSite } from "@/components/LogoSite"
import { ReactNode } from "react"

interface AuthContainerProps {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function AuthContainer({ children, title = "Panel de Administración", subtitle = "Inicia sesión para continuar" }: AuthContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-brand-100 p-8">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <LogoSite className="h-12" withLink={false} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}