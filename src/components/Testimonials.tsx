import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      rating: 4
    },
    {
      name: "Roberto Sánchez",
      location: "Puebla",
      text: "Viajé por Italia y España, la conexión fue estable y rápida en todo momento.",
      rating: 5
    },
    {
      name: "Laura Torres",
      location: "Cancún",
      text: "El proceso de compra fue muy sencillo y la atención al cliente excelente.",
      rating: 4
    },
    {
      name: "Diego Ramírez",
      location: "Tijuana",
      text: "Perfecto para mi viaje de negocios por Europa. Conexión confiable y veloz.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Lo que dicen nuestros viajeros
        </h2>
        
        {/* Overall Rating Display */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i < 4 || i === 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-200 text-yellow-200'}`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-800">4.7</span>
          </div>
          <span className="text-gray-500">792 reseñas verificadas</span>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-200 text-yellow-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}