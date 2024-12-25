import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wifi } from "lucide-react";

interface SimCardProps {
  type: "physical" | "esim";
  title: string;
  description: string;
  price: number;
  features: string[];
}

export function SimCard({ type, title, description, price, features }: SimCardProps) {
  return (
    <Card className="w-full max-w-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm border border-gray-200/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          {type === "physical" ? (
            <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <CreditCard className="h-6 w-6 text-primary animate-pulse" />
            </div>
          ) : (
            <div className="p-2 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
              <Wifi className="h-6 w-6 text-secondary animate-pulse" />
            </div>
          )}
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </div>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 transform transition-all duration-300 hover:scale-105">
          <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ${price} <span className="text-sm font-normal text-gray-600">MXN</span>
          </p>
        </div>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 group">
              <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:scale-150 transition-transform duration-300" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
            </li>
          ))}
        </ul>
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Comprar Ahora
        </Button>
      </CardContent>
    </Card>
  );
}