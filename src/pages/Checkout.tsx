import { Header } from "@/components/Header";
import { Cart } from "@/components/cart/Cart";
import { PaymentSecurity } from "@/components/PaymentSecurity";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          <Cart />
          <div className="mt-12">
            <PaymentSecurity />
          </div>
        </div>
      </main>
    </div>
  );
}