import { Shield, Lock } from "lucide-react";

export function PaymentSecurity() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Paga con Total Seguridad
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-12">
            <img 
              src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" 
              alt="Visa"
              className="h-5 sm:h-6 md:h-8 object-contain"
            />
            <img 
              src="https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/logo/mc-logo-52.svg" 
              alt="Mastercard"
              className="h-5 sm:h-6 md:h-8 object-contain"
            />
            <img 
              src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg" 
              alt="PayPal"
              className="h-5 sm:h-6 md:h-8 object-contain"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
              alt="Stripe"
              className="h-5 sm:h-6 md:h-8 object-contain"
            />
            <img 
              src="https://developers.google.com/static/pay/api/images/brand-guidelines/google-pay-mark.png" 
              alt="Google Pay"
              className="h-5 sm:h-6 md:h-8 object-contain grayscale"
            />
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