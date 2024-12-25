import { Shield, CreditCard, Lock } from "lucide-react";

export function PaymentSecurity() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Paga con Total Seguridad
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="flex items-center gap-2 text-gray-600">
              <CreditCard className="w-8 h-8" />
              <span className="font-semibold">Visa</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CreditCard className="w-8 h-8" />
              <span className="font-semibold">Mastercard</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CreditCard className="w-8 h-8" />
              <span className="font-semibold">PayPal</span>
            </div>
          </div>

          {/* Security Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Pago 100% Seguro</h3>
                <p className="text-gray-600 text-sm">
                  Todas las transacciones están protegidas con encriptación SSL de última generación
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Datos Protegidos</h3>
                <p className="text-gray-600 text-sm">
                  Tu información personal y datos de pago están siempre seguros con nosotros
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}