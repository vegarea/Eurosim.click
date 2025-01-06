import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import { OrderItem } from "@/types/database/orderItems";

interface CartItemProps {
  item: OrderItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: CartItemProps) {
  const metadata = item.metadata as Record<string, any>;
  
  return (
    <div className="py-4 flex items-start gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">
          {metadata?.product_title || 'Producto'}
        </h3>
        <p className="text-sm text-gray-500">
          {metadata?.product_type === 'esim' ? 
            `${metadata?.data_eu_gb}GB Europa / ${metadata?.data_es_gb}GB España` : 
            'SIM Física'}
        </p>
        <p className="mt-1 text-sm font-medium text-primary">
          {formatCurrency(item.unit_price)}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive/90"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}