import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/database/products";
import { OrderItem } from "@/types/database/orderItems";

interface CartContextType {
  items: OrderItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const { toast } = useToast();

  const addItem = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product_id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product_id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const newItem: OrderItem = {
        id: crypto.randomUUID(),
        product_id: product.id,
        quantity: 1,
        unit_price: product.price,
        total_price: product.price,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        metadata: {
          product_title: product.title,
          product_type: product.type,
          data_eu_gb: product.data_eu_gb,
          data_es_gb: product.data_es_gb
        }
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
        item.id === id ? { 
          ...item, 
          quantity,
          total_price: item.unit_price * quantity 
        } : item
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