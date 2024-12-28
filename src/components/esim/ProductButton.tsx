import { CreditCard, Wifi, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency";

interface ProductButtonProps {
  title: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
  type: "physical" | "esim";
  isPopular?: boolean;
}

export function ProductButton({ 
  title, 
  price, 
  isSelected, 
  onClick, 
  type,
  isPopular = false
}: ProductButtonProps) {
  const getColorScheme = (title: string) => {
    switch (title) {
      case "E-SIM S":
      case "Tarifa S":
        return {
          bg: "bg-[#F2FCE2]",
          iconColor: "text-gray-700"
        };
      case "E-SIM M":
      case "Tarifa M":
        return {
          bg: "bg-[#D3E4FD]",
          iconColor: "text-gray-700"
        };
      case "E-SIM L":
      case "Tarifa L":
        return {
          bg: "bg-[#E5DEFF]",
          iconColor: "text-gray-700"
        };
      case "E-SIM XL":
      case "Tarifa XL":
        return {
          bg: "bg-[#FFDEE2]",
          iconColor: "text-gray-700"
        };
      case "E-SIM XXL":
      case "Tarifa XXL":
        return {
          bg: "bg-[#FDE1D3]",
          iconColor: "text-gray-700"
        };
      default:
        return {
          bg: "bg-[#D3E4FD]",
          iconColor: "text-gray-700"
        };
    }
  };

  const colorScheme = getColorScheme(title);
  const [amount, currency] = formatCurrency(price).split(' ');

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full transition-all duration-300 p-2 md:p-4 rounded-xl backdrop-blur-sm relative",
        "hover:shadow-lg hover:-translate-y-1",
        "flex items-center gap-2 md:gap-3",
        isSelected ? 
          `${colorScheme.bg} shadow-lg` : 
          `${colorScheme.bg} opacity-80 hover:opacity-100`
      )}
    >
      {isPopular && (
        <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" />
          <span>Más vendido</span>
        </div>
      )}
      
      <div className={cn(
        "p-2 rounded-lg bg-white/50 backdrop-blur-sm"
      )}>
        {type === 'physical' ? (
          <CreditCard className={cn("h-4 w-4", colorScheme.iconColor)} />
        ) : (
          <Wifi className={cn("h-4 w-4", colorScheme.iconColor)} />
        )}
      </div>
      
      <div className="flex-1 text-left">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-base font-bold text-primary flex items-baseline gap-1">
          {amount}
          <span className="text-sm font-normal text-gray-500">{currency}</span>
        </p>
      </div>
    </button>
  );
}