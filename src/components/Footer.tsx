import { Link } from "react-router-dom";
import { LogoSite } from "./LogoSite";

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Primera columna */}
          <div className="space-y-4">
            <LogoSite className="h-8 w-auto" />
            <p className="text-sm text-gray-600">
              Conectando viajeros en Europa con la mejor solución de datos móviles
            </p>
          </div>

          {/* Segunda columna */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Productos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sims" className="text-sm text-gray-600 hover:text-primary">
                  SIM Física
                </Link>
              </li>
              <li>
                <Link to="/e-sims" className="text-sm text-gray-600 hover:text-primary">
                  eSIM
                </Link>
              </li>
            </ul>
          </div>

          {/* Tercera columna */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Soporte</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/como-funciona" className="text-sm text-gray-600 hover:text-primary">
                  ¿Cómo funciona?
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="text-sm text-gray-600 hover:text-primary">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Cuarta columna */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacidad" className="text-sm text-gray-600 hover:text-primary">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-sm text-gray-600 hover:text-primary">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
