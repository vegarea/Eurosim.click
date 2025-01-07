import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Signal, Wifi, MessageCircle, Info } from "lucide-react";
import EUFlag from "@/components/icons/EUFlag";
import { LogoSite } from "./LogoSite";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CountryCoverageModal } from "./modals/CountryCoverageModal";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCoverage, setShowCoverage] = useState(false);
  const location = useLocation();
  const [cartItems] = useState(0);

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "eSIMs", href: "/e-sims", icon: <Wifi className="w-4 h-4" /> },
    { label: "SIM Card", href: "/sims", icon: <Signal className="w-4 h-4" /> },
    { label: "¿Cómo funciona?", href: "/como-funciona", icon: <Info className="w-4 h-4" /> },
    { label: "Contacto", href: "/contact", icon: <MessageCircle className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-100/80" />
      
      <div className="container relative flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo with Link */}
        <Link to="/">
          <LogoSite />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`group flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-brand-50 text-brand-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.icon && (
                <span className={`${isActive(item.href) ? "text-brand-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                  {item.icon}
                </span>
              )}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setShowCoverage(true)}
          >
            <EUFlag className="w-4 h-4" />
            <span>Cobertura en toda Europa</span>
          </Button>

          <Link to="/checkout">
            <Button 
              variant="ghost" 
              size="sm"
              className="relative text-gray-600 hover:text-brand-600 hover:bg-brand-50"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand-600 text-[10px] font-medium text-white flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>
          </Link>
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
                  className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-brand-50 text-brand-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && (
                    <span className={isActive(item.href) ? "text-brand-600" : "text-gray-400"}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </Link>
              ))}
              
              <div className="mt-4 space-y-3">
                <Button 
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-brand-600 hover:bg-brand-50"
                  onClick={() => {
                    setIsOpen(false);
                    setShowCoverage(true);
                  }}
                >
                  <EUFlag className="w-4 h-4 mr-2" />
                  Cobertura en toda Europa
                </Button>
                
                <Link to="/checkout">
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-brand-600 hover:bg-brand-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Carrito ({cartItems})
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <CountryCoverageModal 
        isOpen={showCoverage} 
        onClose={() => setShowCoverage(false)} 
      />
    </header>
  );
}