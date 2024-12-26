import { Shield, Lock } from "lucide-react";

export function PaymentSecurity() {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-semibold text-center mb-4 text-gray-700">
          Paga con Total Seguridad
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
            <img 
              src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" 
              alt="Visa"
              className="h-4 object-contain"
            />
            <img 
              src="https://www.mastercard.es/content/dam/public/mastercardcom/eu/es/images/logo/mc-logo-52.svg" 
              alt="Mastercard"
              className="h-4 object-contain"
            />
            <img 
              src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg" 
              alt="PayPal"
              className="h-4 object-contain"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
              alt="Stripe"
              className="h-4 object-contain"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/640px-Google_Pay_Logo.svg.png" 
              alt="Google Pay"
              className="h-4 object-contain grayscale"
            />
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg flex items-start gap-2">
              <div className="bg-primary/5 p-1.5 rounded-full">
                <Shield className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs font-medium mb-0.5">Pago 100% Seguro</h3>
                <p className="text-[11px] text-gray-500 leading-tight">
                  Transacciones protegidas con encriptación SSL
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg flex items-start gap-2">
              <div className="bg-primary/5 p-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs font-medium mb-0.5">Datos Protegidos</h3>
                <p className="text-[11px] text-gray-500 leading-tight">
                  Tu información personal está siempre segura
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}