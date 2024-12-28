import { Minus, Plus, Trash2, Mail, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CartItemProps {
  id: string;
  productId: string; // Añadido ID del producto
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
  productId,
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
        icon: <Truck className="h-4 w-4" />,
        text: "SIM Física - Entrega a domicilio",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200"
      };
    }
    return {
      icon: <Mail className="h-4 w-4" />,
      text: "eSIM - Entrega por email",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200"
    };
  };

  const deliveryInfo = getDeliveryInfo(type);

  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
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
            onClick={() => onUpdateQuantity(productId, Math.max(0, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(productId, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={() => onRemove(productId)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={`${deliveryInfo.bgColor} ${deliveryInfo.borderColor} border rounded-lg p-2 mt-2`}>
        <div className={`flex items-center gap-2 ${deliveryInfo.textColor}`}>
          {deliveryInfo.icon}
          <span className="text-sm">{deliveryInfo.text}</span>
        </div>
      </div>
    </div>
  );
}