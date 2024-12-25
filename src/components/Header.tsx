import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Globe, ShoppingCart, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems] = useState(0); // Este estado se manejará con el contexto del carrito más adelante

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Planes eSIM", href: "/esim" },
    { label: "SIM Física", href: "/physical-sim" },
    { label: "Cobertura", href: "/coverage" },
    { label: "Soporte", href: "/support" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Euro Connect" className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Select defaultValue="es">
            <SelectTrigger className="w-[110px] gap-2">
              <Globe className="h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Button>

          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Iniciar Sesión
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <Select defaultValue="es">
                  <SelectTrigger className="w-full gap-2">
                    <Globe className="h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 w-full">
                  <ShoppingCart className="h-4 w-4" />
                  Carrito ({cartItems})
                </Button>
                <Button className="gap-2 w-full">
                  <User className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}