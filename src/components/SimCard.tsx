import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wifi } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { formatCurrency } from "@/utils/currency";

interface SimCardProps {
  id: string; // Añadido ID del producto
  type: "physical" | "esim";
  title: string;
  description: string;
  price: number;
  features: string[];
  isHighlighted?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

// Función para formatear la descripción con GB en negrita
const formatDescription = (description: string) => {
  return description.replace(
    /(\d+GB)/g,
    '<span class="font-bold">$1</span>'
  );
};

export function SimCard({ 
  id,
  type, 
  title, 
  description, 
  price, 
  features, 
  isHighlighted = false,
  isSelected = false,
  onSelect 
}: SimCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  // Función para determinar el color según el título
  const getColorScheme = (title: string) => {
    switch (title) {
      case "Tarifa M":
        return {
          iconBg: "from-[#F2FCE2] to-[#E5F7D3]",
          iconColor: "text-green-600"
        };
      case "Tarifa L":
        return {
          iconBg: "from-[#D3E4FD] to-[#C4D9F7]",
          iconColor: "text-blue-600"
        };
      case "Tarifa XL":
        return {
          iconBg: "from-[#E5DEFF] to-[#D6CFFF]",
          iconColor: "text-purple-600"
        };
      case "Tarifa XXL":
        return {
          iconBg: "from-[#FFDEE2] to-[#FFD0D5]",
          iconColor: "text-pink-600"
        };
      default:
        return {
          iconBg: "from-[#D3E4FD] to-[#C4D9F7]",
          iconColor: "text-blue-600"
        };
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: `${type}-${id}`, // Usando el ID real del producto
      productId: id, // Guardando el ID real del producto
      type,
      title,
      description,
      price
    });
    navigate('/checkout');
  };

  const colorScheme = getColorScheme(title);
  const formattedPrice = formatCurrency(price);

  return (
    <Card className={`w-full max-w-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden backdrop-blur-sm border-0 bg-gradient-to-br from-white/80 to-white/40 ${
      isSelected ? 'ring-2 ring-primary shadow-lg' : ''
    }`}>
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 animate-shimmer" />
      </div>

      <CardHeader className="relative">
        <div className="flex items-center gap-3">
          <div className={`p-3 bg-gradient-to-br ${colorScheme.iconBg} rounded-xl backdrop-blur-sm`}>
            {type === 'physical' ? (
              <CreditCard className={`h-6 w-6 ${colorScheme.iconColor} animate-pulse`} />
            ) : (
              <Wifi className={`h-6 w-6 ${colorScheme.iconColor} animate-pulse`} />
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <CardDescription 
              className="text-base mt-1"
              dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <div className="mb-8 transform transition-all duration-300 hover:scale-105">
          <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {formattedPrice}
          </p>
        </div>

        <ul className="space-y-4 my-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 group">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:scale-150 transition-transform duration-300" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-primary/20"
          onClick={handleAddToCart}
        >
          Añadir al Carrito
        </Button>
      </CardContent>

      {/* Elementos decorativos de fondo */}
      <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl" />
      <div className="absolute -z-10 bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-2xl" />
    </Card>
  );
}
