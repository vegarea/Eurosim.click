import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface CartItem {
  id: string;
  type: "physical" | "esim";
  title: string;
  description: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "shopping_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Inicializar desde localStorage
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const { toast } = useToast();

  // Persistir cambios en localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = async (newItem: Omit<CartItem, "quantity">) => {
    try {
      const { data: product, error } = await supabase
        .from('products')
        .select('id, status, title, stock')
        .eq('id', newItem.id)
        .single();

      if (error) {
        throw new Error('Error al verificar el producto');
      }

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      if (product.status !== 'active') {
        throw new Error('Este producto no está disponible actualmente');
      }

      if (newItem.type === 'physical' && product.stock <= 0) {
        throw new Error('Este producto está agotado');
      }

      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === newItem.id);
        
        if (existingItem) {
          if (newItem.type === 'physical' && existingItem.quantity >= product.stock) {
            toast({
              title: "No hay suficiente stock disponible",
              description: `Solo quedan ${product.stock} unidades disponibles`,
            });
            return currentItems;
          }
          
          return currentItems.map(item =>
            item.id === newItem.id
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
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error al añadir el producto",
        variant: "destructive"
      });
    }
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      const item = items.find(i => i.id === id);
      if (!item) return;

      if (item.type === 'physical') {
        // Verificar stock disponible
        const { data: product, error } = await supabase
          .from('products')
          .select('stock')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!product) throw new Error('Producto no encontrado');

        if (quantity > product.stock) {
          toast({
            title: "Stock insuficiente",
            description: `Solo hay ${product.stock} unidades disponibles`,
            variant: "destructive"
          });
          return;
        }
      }

      setItems(currentItems =>
        currentItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la cantidad",
        variant: "destructive"
      });
    }
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