import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "María García",
      location: "Ciudad de México",
      text: "¡Excelente servicio! Viajé por 3 países de Europa y nunca perdí la conexión.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez",
      location: "Guadalajara",
      text: "La eSIM fue súper fácil de instalar. El soporte técnico siempre estuvo disponible.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      location: "Monterrey",
      text: "Me encantó poder recibir mi SIM física antes de viajar. Todo funcionó perfecto.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Lo que dicen nuestros viajeros
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
              <div className="text-sm">
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}