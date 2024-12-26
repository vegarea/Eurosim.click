import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Package, ShoppingCart, CreditCard } from "lucide-react";

const metrics = [
  {
    title: "Ventas Totales",
    value: "$12,345",
    icon: CreditCard,
    change: "+12%",
    changeType: "positive",
  },
  {
    title: "Pedidos",
    value: "324",
    icon: ShoppingCart,
    change: "+8%",
    changeType: "positive",
  },
  {
    title: "Clientes",
    value: "1,234",
    icon: Users,
    change: "+23%",
    changeType: "positive",
  },
  {
    title: "Productos",
    value: "45",
    icon: Package,
    change: "+2",
    changeType: "neutral",
  },
];

export const DashboardMetrics = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${
                metric.changeType === "positive" 
                  ? "text-green-600" 
                  : metric.changeType === "negative" 
                  ? "text-red-600" 
                  : "text-gray-600"
              }`}>
                {metric.change} desde el último mes
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};