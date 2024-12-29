import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/database/enums";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "payment_pending":
        return "bg-yellow-100 text-yellow-800";
      case "payment_failed":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge variant="secondary" className={getStatusColor(status)}>
      {status.replace("_", " ")}
    </Badge>
  );
}