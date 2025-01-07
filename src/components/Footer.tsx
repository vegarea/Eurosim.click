import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-6">
        {/* Enlaces principales */}
        <nav className="flex flex-wrap justify-center gap-8 mb-4">
          <Link 
            to="/blog" 
            className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
          >
            Blog
          </Link>
          <Link 
            to="/preguntas-frecuentes" 
            className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
          >
            Preguntas Frecuentes
          </Link>
          <Link 
            to="/como-funciona" 
            className="text-sm text-gray-600 hover:text-primary flex items-center gap-1"
          >
            ¿Cómo funciona?
          </Link>
        </nav>

        {/* Enlaces tercer nivel */}
        <div className="flex justify-center mb-4">
          <Link 
            to="/politicas-privacidad" 
            className="text-xs text-gray-400 hover:text-primary flex items-center gap-0.5"
          >
            <ChevronRight className="h-3 w-3" />
            <span>Políticas de privacidad</span>
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-400">
          <p>© {currentYear} Euro Connect</p>
        </div>
      </div>
    </footer>
  )
}