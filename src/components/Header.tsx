import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems] = useState(0);

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Planes eSIM", href: "/esim" },
    { label: "SIM Física", href: "/physical-sim" },
    { label: "Cobertura", href: "/coverage" },
    { label: "Soporte", href: "/support" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-white via-brand-50 to-white backdrop-blur-xl">
      <div className="absolute inset-0 bg-white/40" />
      
      <div className="container relative flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center transition-transform hover:scale-105"
        >
          <img src="/logo.png" alt="Euro Connect" className="h-8 w-auto drop-shadow-sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-gray-600 transition-all duration-200 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-white/50 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center animate-pulse">
                {cartItems}
              </span>
            )}
          </Button>

          <Button 
            variant="default" 
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20"
          >
            <User className="h-4 w-4" />
            Iniciar Sesión
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-white/50 transition-colors"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] sm:w-[400px] bg-gradient-to-b from-white to-brand-50"
          >
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-lg font-medium text-gray-600 transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <Button 
                  variant="outline" 
                  className="gap-2 w-full bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Carrito ({cartItems})
                </Button>
                <Button 
                  className="gap-2 w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
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