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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-brand-500/80 via-brand-500/90 to-brand-500/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-white/10" />
      
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
              className="text-sm font-medium text-white transition-all duration-200 hover:text-brand-100 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-200 hover:after:w-full"
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
            className="relative hover:bg-white/10 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-white" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-[10px] font-medium text-brand-500 flex items-center justify-center animate-pulse">
                {cartItems}
              </span>
            )}
          </Button>

          <Button 
            variant="ghost" 
            className="gap-2 text-white hover:bg-white/10 hover:text-brand-100 transition-all duration-200"
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
              className="hover:bg-white/10 transition-colors"
            >
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] sm:w-[400px] bg-gradient-to-b from-brand-500 to-brand-600"
          >
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-lg font-medium text-white transition-colors hover:text-brand-100"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <Button 
                  variant="outline" 
                  className="gap-2 w-full bg-white/10 hover:bg-white/20 text-white border-white/20 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Carrito ({cartItems})
                </Button>
                <Button 
                  variant="ghost"
                  className="gap-2 w-full text-white hover:bg-white/10 hover:text-brand-100 transition-all duration-200"
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