import { Star, Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Testimonials() {
  const testimonials = [
    {
      name: "María García",
      location: "Ciudad de México",
      text: "¡Excelente servicio! Viajé por 3 países de Europa y nunca perdí la conexión.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Carlos Rodríguez",
      location: "Guadalajara",
      text: "La eSIM fue súper fácil de instalar. El soporte técnico siempre estuvo disponible.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Ana Martínez",
      location: "Monterrey",
      text: "Me encantó poder recibir mi SIM física antes de viajar. Todo funcionó perfecto.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Roberto Sánchez",
      location: "Puebla",
      text: "Viajé por Italia y España, la conexión fue estable y rápida en todo momento.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Laura Torres",
      location: "Cancún",
      text: "El proceso de compra fue muy sencillo y la atención al cliente excelente.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Diego Ramírez",
      location: "Tijuana",
      text: "Perfecto para mi viaje de negocios por Europa. Conexión confiable y veloz.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Lo que dicen nuestros viajeros
        </h2>
        
        {/* Overall Rating Display */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < 4 || i === 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-200 text-yellow-200'}`}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-gray-800 ml-1">4.7</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>792 reseñas</span>
            <div className="flex items-center gap-1">
              <span>verificadas</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
          </div>
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
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-200 text-yellow-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
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