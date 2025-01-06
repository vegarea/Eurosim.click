import { CreditCard, Wifi, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency";
import { Product } from "@/types/database/products";

interface ProductButtonProps {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
  onSelect?: () => void;
  isPopular?: boolean;
}

export function ProductButton({ 
  product,
  isSelected, 
  onClick,
  onSelect,
  isPopular = false
}: ProductButtonProps) {
  const [amount, currency] = formatCurrency(product.price).split(' ');

  const handleClick = () => {
    onClick();
    if (onSelect) onSelect();
  };

  // Función para determinar el color de fondo basado en el precio
  const getBackgroundColor = (price: number) => {
    // Ordenados de menor a mayor precio
    if (price <= 50000) return "#D3E4FD"; // Azul suave para el plan más básico
    if (price <= 70000) return "#F2FCE2"; // Verde suave para el plan medio-bajo
    if (price <= 90000) return "#FEC6A1"; // Naranja suave para el plan medio-alto
    return "#FFDEE2"; // Rosa suave para el plan premium
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full p-2 md:p-4 rounded-xl relative",
        "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
        "flex items-center gap-2 md:gap-3",
        isSelected ? "shadow-lg" : "",
        `bg-[${getBackgroundColor(product.price)}]`
      )}
    >
      {isPopular && (
        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" />
          <span>Más vendido</span>
        </div>
      )}
      
      <div className="p-2 rounded-lg bg-white/50">
        {product.type === 'physical' ? (
          <CreditCard className="h-4 w-4 text-gray-700" />
        ) : (
          <Wifi className="h-4 w-4 text-gray-700" />
        )}
      </div>
      
      <div className="flex-1 text-left">
        <h3 className="text-sm font-semibold">{product.title}</h3>
        <p className="text-base font-bold text-primary flex items-baseline gap-1">
          {amount}
          <span className="text-sm font-normal text-gray-500">{currency}</span>
        </p>
      </div>
    </button>
  );
}