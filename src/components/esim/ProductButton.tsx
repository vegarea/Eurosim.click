import { CreditCard, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductButtonProps {
  title: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
  type: "physical" | "esim";
}

export function ProductButton({ title, price, isSelected, onClick, type }: ProductButtonProps) {
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

  const colorScheme = getColorScheme(title);

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full transition-all duration-300 p-3 md:p-6 rounded-xl backdrop-blur-sm",
        "hover:shadow-lg hover:-translate-y-1",
        "flex items-center gap-2 md:gap-4",
        isSelected ? 
          "bg-gradient-to-r from-primary/20 to-secondary/20 shadow-lg" : 
          "bg-white/50 hover:bg-white"
      )}
    >
      <div className={cn(
        "p-2 md:p-4 rounded-lg bg-gradient-to-br",
        colorScheme.iconBg
      )}>
        {type === 'physical' ? (
          <CreditCard className={cn("h-4 w-4 md:h-6 md:w-6", colorScheme.iconColor)} />
        ) : (
          <Wifi className={cn("h-4 w-4 md:h-6 md:w-6", colorScheme.iconColor)} />
        )}
      </div>
      
      <div className="flex-1 text-left">
        <h3 className="text-sm md:text-lg font-semibold">{title}</h3>
        <p className="text-base md:text-xl font-bold text-primary">
          ${price}
          <span className="text-xs md:text-sm font-normal text-gray-600 ml-1">MXN</span>
        </p>
      </div>
    </button>
  );
}