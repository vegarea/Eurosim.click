import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/database/products";

// Solo usamos los campos necesarios de Product para el carrito
export interface CartItem {
  id: string;
  type: Product['type'];
  title: string;
  price: number;
  data_eu_gb: number;
  data_es_gb: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addItem = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Añadimos solo los campos necesarios del producto
      const newItem: CartItem = {
        id: product.id,
        type: product.type,
        title: product.title,
        price: product.price,
        data_eu_gb: product.data_eu_gb,
        data_es_gb: product.data_es_gb,
        quantity: 1
      };

      return [...currentItems, newItem];
    });

    toast({
      title: "Producto añadido al carrito",
      description: `Has añadido ${product.title} a tu carrito`,
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}