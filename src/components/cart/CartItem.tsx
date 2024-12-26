import { Minus, Plus, Trash2, Mail, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CartItemProps {
  id: string;
  type: "physical" | "esim";
  title: string;
  description: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  id,
  type,
  title,
  description,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const getDeliveryInfo = (type: "physical" | "esim") => {
    if (type === "physical") {
      return {
        icon: <Truck className="h-3 w-3" />,
        text: "SIM Física - Entrega a domicilio",
        variant: "secondary" as const
      };
    }
    return {
      icon: <Mail className="h-3 w-3" />,
      text: "eSIM - Entrega por email",
      variant: "default" as const
    };
  };

  const deliveryInfo = getDeliveryInfo(type);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100">
      <div className="flex-1 space-y-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <Badge 
          variant={deliveryInfo.variant}
          className="text-xs flex items-center gap-1 w-fit"
        >
          {deliveryInfo.icon}
          {deliveryInfo.text}
        </Badge>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="mt-1 text-sm font-medium text-primary">
          ${price.toFixed(2)} MXN
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(id, Math.max(0, quantity - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(id, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-500"
          onClick={() => onRemove(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}