import { Link } from "react-router-dom"
import { Globe, Mail, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <Link to="/" className="text-xl font-semibold text-primary">
              Euro Connect
            </Link>
            <p className="text-sm text-gray-600">
              Conectividad móvil para tus viajes por Europa
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <nav className="space-y-4">
            <h3 className="font-medium text-gray-900">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/e-sims" className="text-sm text-gray-600 hover:text-primary">
                  eSIMs
                </Link>
              </li>
              <li>
                <Link to="/sims" className="text-sm text-gray-600 hover:text-primary">
                  SIM Cards
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Columna 3: Contacto */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <span>España</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@euroconnect.com" className="hover:text-primary">
                  info@euroconnect.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <a href="tel:+34900000000" className="hover:text-primary">
                  +34 900 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t text-center text-sm text-gray-600">
          <p>© {currentYear} Euro Connect. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}