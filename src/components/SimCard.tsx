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
    <Card className="w-full max-w-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-2">
          {type === "physical" ? (
            <CreditCard className="h-6 w-6 text-primary" />
          ) : (
            <Wifi className="h-6 w-6 text-secondary" />
          )}
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </div>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-3xl font-bold text-primary">
            ${price} <span className="text-sm font-normal text-gray-600">MXN</span>
          </p>
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
          Comprar Ahora
        </Button>
      </CardContent>
    </Card>
  );
}