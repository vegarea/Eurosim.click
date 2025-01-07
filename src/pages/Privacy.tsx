import { Header } from "@/components/Header"
import { MainLayout } from "@/components/layouts/MainLayout"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { Link } from "react-router-dom"

const Privacy = () => {
  return (
    <MainLayout>
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Política de Privacidad</h1>
          <p className="text-sm text-gray-500 mb-8">Última actualización: 19 de marzo de 2024</p>

          <p className="text-gray-600 mb-8">
            En Eurosim, respetamos tu privacidad y nos comprometemos a proteger la información personal que compartes con nosotros. 
            Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información. 
            Al utilizar nuestros servicios, aceptas los términos descritos en esta política.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Información que recopilamos</h2>
            <p className="text-gray-600 mb-4">Cuando utilizas nuestros servicios, podemos recopilar la siguiente información:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Datos personales:</span> Nombre, dirección de correo electrónico, 
                número de teléfono y, en algunos casos, número de pasaporte.
              </li>
              <li>
                <span className="font-medium">Información de compra:</span> Detalles del plan adquirido, 
                métodos de pago (sin almacenar información completa de tarjetas de crédito), 
                y direcciones de envío para SIMs físicas.
              </li>
              <li>
                <span className="font-medium">Datos técnicos:</span> Dirección IP, tipo de dispositivo, 
                y cookies para mejorar tu experiencia en nuestra página web.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Uso de la información</h2>
            <p className="text-gray-600 mb-4">Usamos tu información para:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Procesar tus compras y entregarte los productos o servicios solicitados.</li>
              <li>Personalizar tu experiencia en nuestra página web.</li>
              <li>Cumplir con los requisitos de registro y validación establecidos por los operadores de telecomunicaciones.</li>
              <li>Enviarte comunicaciones relacionadas con tu compra, como confirmaciones y actualizaciones.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Información sobre el uso de datos de pasaporte</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
              <p className="text-gray-600 mb-4">
                En cumplimiento con las normativas de los operadores de telecomunicaciones, 
                recopilamos tu número de pasaporte exclusivamente para:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Registro y validación de la SIM o eSIM con los operadores telefónicos.</li>
                <li>Garantizar el cumplimiento de las leyes locales sobre identificación y registro de usuarios.</li>
              </ul>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Resguardo de la información:</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>La información del pasaporte se almacena utilizando medidas de seguridad avanzadas, como encriptación AES-256.</li>
              <li>Estos datos no serán utilizados para ningún otro propósito ni compartidos con terceros.</li>
              <li>Los datos de pasaporte se eliminan de forma segura después de cumplir con los requisitos de registro.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Protección de tu información</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Encriptación de datos sensibles durante el almacenamiento y la transmisión.</li>
              <li>Control de acceso restringido a personal autorizado.</li>
              <li>Monitoreo continuo de nuestro sistema para prevenir posibles vulnerabilidades.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Compartir información con terceros</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Con operadores de telecomunicaciones:</span> Para cumplir con el registro y validación.
              </li>
              <li>
                <span className="font-medium">Con proveedores de servicios:</span> Terceros que nos ayudan a procesar pagos o realizar entregas.
              </li>
              <li>
                <span className="font-medium">Cuando la ley lo requiera:</span> Para cumplir con normativas legales.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Derechos del usuario</h2>
            <p className="text-gray-600 mb-4">Como usuario, tienes derecho a:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Acceder, corregir o eliminar tus datos personales.</li>
              <li>Solicitar una copia de la información que tenemos sobre ti.</li>
              <li>Retirar tu consentimiento para el uso de tus datos.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Empresa responsable</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-gray-600 mb-2">El responsable del tratamiento de tus datos es:</p>
              <p className="font-medium text-gray-900">Mochileros LLC</p>
              <p className="text-gray-600">8th Green St, Dover, Delaware, Estados Unidos.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cambios en esta política</h2>
            <p className="text-gray-600">
              Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas 
              o normativas legales. Publicaremos cualquier cambio en esta página y actualizaremos la fecha al inicio 
              del documento. Te recomendamos revisarla periódicamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Uso de cookies</h2>
            <p className="text-gray-600">
              Utilizamos cookies para mejorar tu experiencia en nuestra página web. Puedes configurar tu navegador 
              para rechazar las cookies, aunque esto podría limitar algunas funcionalidades.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Tiempo de retención de datos</h2>
            <p className="text-gray-600">
              Almacenamos tu información personal solo mientras sea necesario para cumplir con los propósitos 
              descritos en esta política o según lo requiera la ley.
            </p>
          </section>

          <div className="bg-brand-50 p-6 rounded-lg border border-brand-100">
            <h3 className="text-lg font-semibold text-brand-900 mb-3">¿Necesitas ayuda?</h3>
            <p className="text-gray-600 mb-4">
              Si tienes preguntas o inquietudes sobre esta política de privacidad, no dudes en contactarnos.
            </p>
            <Link to="/contact">
              <Button className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contactar soporte
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Privacy