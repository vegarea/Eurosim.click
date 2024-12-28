import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface CartItem {
  id: string;
  productId: string; // Añadido para mantener el ID real del producto
  type: "physical" | "esim";
  title: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems(currentItems => {
      // Ahora buscamos por productId en lugar de id
      const existingItem = currentItems.find(item => item.productId === newItem.productId);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...newItem, quantity: 1 }];
    });

    toast({
      title: "Producto añadido al carrito",
      description: `Has añadido ${newItem.title} a tu carrito`,
    });
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.productId !== productId));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems =>
      currentItems.map(item =>
        item.productId === productId ? { ...item, quantity } : item
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