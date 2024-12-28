import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";
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
  const [cartItems] = useState(0);
  const [currency, setCurrency] = useState("MXN");

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Planes eSIM", href: "/e-sims" },
    { label: "SIM Física", href: "/sims" },
    { label: "Contacto", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="absolute inset-0 bg-white" />
      
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
              className="text-sm font-medium text-gray-700 transition-all duration-200 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Currency Selector */}
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-[100px] h-9 bg-transparent border-none hover:bg-brand-100/50 transition-colors">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span className={`fi fi-${currency === 'EUR' ? 'eu' : currency === 'USD' ? 'us' : 'mx'}`}></span>
                  {currency}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MXN" className="flex items-center gap-2">
                <span className="fi fi-mx"></span>
                MXN
              </SelectItem>
              <SelectItem value="USD" className="flex items-center gap-2">
                <span className="fi fi-us"></span>
                USD
              </SelectItem>
              <SelectItem value="EUR" className="flex items-center gap-2">
                <span className="fi fi-eu"></span>
                EUR
              </SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-brand-100/50 transition-colors"
          >
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center animate-pulse">
                {cartItems}
              </span>
            )}
          </Button>

          <Button 
            variant="ghost" 
            className="gap-2 text-gray-700 hover:bg-brand-100/50 hover:text-brand-700 transition-all duration-200"
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
              className="hover:bg-brand-100/50 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-700" />
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
                  className="text-lg font-medium text-gray-700 transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                {/* Mobile Currency Selector */}
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-full bg-white/80 hover:bg-white transition-colors">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <span className={`fi fi-${currency === 'EUR' ? 'eu' : currency === 'USD' ? 'us' : 'mx'}`}></span>
                        {currency}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MXN" className="flex items-center gap-2">
                      <span className="fi fi-mx"></span>
                      MXN
                    </SelectItem>
                    <SelectItem value="USD" className="flex items-center gap-2">
                      <span className="fi fi-us"></span>
                      USD
                    </SelectItem>
                    <SelectItem value="EUR" className="flex items-center gap-2">
                      <span className="fi fi-eu"></span>
                      EUR
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  className="gap-2 w-full bg-white/80 hover:bg-white transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Carrito ({cartItems})
                </Button>
                <Button 
                  variant="ghost"
                  className="gap-2 w-full text-gray-700 hover:bg-brand-100/50 hover:text-brand-700 transition-all duration-200"
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