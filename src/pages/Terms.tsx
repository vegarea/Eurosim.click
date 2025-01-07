import { Header } from "@/components/Header"
import { MainLayout } from "@/components/layouts/MainLayout"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { Link } from "react-router-dom"

const Terms = () => {
  return (
    <MainLayout>
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Términos y Condiciones</h1>
          <p className="text-sm text-gray-500 mb-8">Última actualización: 19 de marzo de 2024</p>

          <p className="text-gray-600 mb-8">
            Bienvenido a Eurosim. Estos Términos y Condiciones regulan el uso de nuestro sitio web y los servicios que ofrecemos. 
            Al utilizar nuestra plataforma y realizar compras, aceptas cumplir con los términos descritos a continuación. 
            Te recomendamos leerlos cuidadosamente.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Definiciones</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">"Eurosim":</span> Se refiere a la marca operada por Mochileros LLC, 
                con domicilio en 8th Green St, Dover, Delaware, Estados Unidos.
              </li>
              <li>
                <span className="font-medium">"Usuario":</span> Cualquier persona que accede a nuestro sitio web 
                o utiliza nuestros servicios.
              </li>
              <li>
                <span className="font-medium">"Producto":</span> Se refiere a las eSIMs y SIMs físicas ofrecidas 
                a través de nuestra plataforma.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Uso del sitio web</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Este sitio está destinado únicamente a mayores de 18 años.</li>
              <li>El usuario es responsable de garantizar que toda la información proporcionada es veraz, completa y actualizada.</li>
              <li>No se permite utilizar el sitio web para actividades ilícitas o fraudulentas.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Productos y servicios</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-600 mb-4">
                Ofrecemos eSIMs y SIMs físicas para viajeros, seleccionadas de operadores reconocidos 
                como Vodafone, Orange, entre otros.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compatibilidad</h3>
              <p className="text-gray-600 mb-4">
                Es responsabilidad del usuario verificar que su dispositivo sea compatible con eSIMs antes de realizar la compra. 
                Si el dispositivo no es compatible, puede optar por una SIM física (envío disponible solo en México).
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Duración y activación</h3>
              <p className="text-gray-600">
                Las eSIMs tienen una validez de 30 días desde la fecha de activación indicada por el usuario 
                en el momento de la compra.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Recolección de datos personales</h2>
            <p className="text-gray-600 mb-4">
              Algunos servicios requieren la recolección de información personal, como el número de pasaporte, 
              para cumplir con los requisitos de registro de los operadores de telecomunicaciones.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Uso exclusivo:</span> Esta información será utilizada únicamente para 
                la validación y registro de la SIM o eSIM con el operador.
              </li>
              <li>
                <span className="font-medium">Seguridad:</span> Los datos personales se almacenan de manera segura, 
                utilizando encriptación avanzada, y no serán compartidos con terceros fuera de los operadores autorizados.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Entrega y activación</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">eSIM:</span> El código QR de activación será enviado por correo electrónico 
                un día antes de la fecha de activación seleccionada por el usuario.
              </li>
              <li>
                <span className="font-medium">SIM física:</span> Las SIMs físicas se envían únicamente a domicilios en México 
                y están sujetas a los tiempos de envío estimados proporcionados durante la compra.
              </li>
              <li>
                <span className="font-medium">Errores de activación:</span> Es responsabilidad del usuario seguir las instrucciones 
                proporcionadas para la activación. Eurosim no se hace responsable por errores derivados de configuraciones 
                incorrectas del dispositivo.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Pagos y reembolsos</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Política de pagos:</span> Aceptamos métodos de pago seguros a través de nuestra plataforma. 
                No almacenamos información completa de tarjetas de crédito.
              </li>
              <li>
                <span className="font-medium">Reembolsos:</span> No se ofrecen reembolsos por compras de eSIMs o SIMs físicas 
                una vez enviada la confirmación del pedido. En caso de problemas técnicos, ofrecemos soporte para resolverlos.
              </li>
              <li>
                <span className="font-medium">Precios:</span> Los precios están sujetos a cambios sin previo aviso. 
                Las compras realizadas antes del cambio de precio no se verán afectadas.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Responsabilidades del usuario</h2>
            <p className="text-gray-600 mb-4">El usuario acepta que:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Utilizará el producto exclusivamente para fines personales y legales.</li>
              <li>Proporcionará información exacta y actualizada durante el proceso de compra.</li>
              <li>Respetará las leyes locales del país donde se utilicen las SIMs o eSIMs.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitaciones de responsabilidad</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Eurosim no se hace responsable por interrupciones en el servicio causadas por fallas de red de los operadores.</li>
              <li>No garantizamos que el servicio esté disponible en todas las áreas geográficas debido a restricciones de los operadores de telecomunicaciones.</li>
              <li>En ningún caso seremos responsables por daños indirectos, incidentales o punitivos derivados del uso de nuestros productos.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modificaciones a los términos</h2>
            <p className="text-gray-600">
              Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. 
              Las actualizaciones serán publicadas en esta página y entrarán en vigor inmediatamente. 
              El uso continuado de nuestro sitio web implica la aceptación de los cambios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Ley aplicable y jurisdicción</h2>
            <p className="text-gray-600">
              Estos Términos y Condiciones se rigen por las leyes del estado de Delaware, Estados Unidos. 
              Cualquier disputa será resuelta en los tribunales de esta jurisdicción.
            </p>
          </section>

          <div className="bg-brand-50 p-6 rounded-lg border border-brand-100">
            <h3 className="text-lg font-semibold text-brand-900 mb-3">¿Necesitas ayuda?</h3>
            <p className="text-gray-600 mb-4">
              Si tienes preguntas o inquietudes sobre estos términos y condiciones, no dudes en contactarnos.
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

export default Terms