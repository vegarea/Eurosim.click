import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Globe2, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [cartItems] = useState(0);

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "eSIMs", href: "/e-sims" },
    { label: "SIM Card", href: "/sims" },
    { label: "Contacto", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 supports-[backdrop-filter]:bg-white/60">
      <div className="absolute inset-0 border-b border-slate-100/80" />
      
      <div className="container relative flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center transition-transform hover:scale-105"
        >
          <img src="/logo.png" alt="Euro Connect" className="h-8 w-auto drop-shadow-sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-brand-50 text-brand-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-brand-600 hover:bg-brand-50"
          >
            <Globe2 className="h-4 w-4 mr-2" />
            ES
          </Button>

          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-brand-600 hover:bg-brand-50"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand-600 text-[10px] font-medium text-white flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </Button>

          <Button 
            size="sm"
            className="bg-gradient-to-r from-brand-600 to-secondary hover:opacity-90 text-white gap-2 shadow-sm"
          >
            Comprar Ahora
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-brand-50 transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[300px] sm:w-[400px] bg-gradient-to-b from-white to-brand-50/50"
          >
            <nav className="flex flex-col gap-2 mt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 space-y-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-600 hover:text-brand-600 hover:bg-brand-50"
                >
                  <Globe2 className="h-4 w-4 mr-2" />
                  Español
                </Button>
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-brand-600 hover:bg-brand-50"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Carrito ({cartItems})
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-brand-600 to-secondary hover:opacity-90 text-white gap-2"
                >
                  Comprar Ahora
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}