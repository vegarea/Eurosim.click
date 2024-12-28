import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ProductCard } from "./products/ProductCard"
import { AddProductDialog } from "./products/AddProductDialog"
import { supabase } from "@/integrations/supabase/client"
import type { Tables } from "@/integrations/supabase/types"

type Product = Tables<"products">

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert(productData)

      if (error) throw error

      toast({
        title: "Producto añadido",
        description: "El producto se ha añadido correctamente"
      })
      
      fetchProducts()
    } catch (error) {
      console.error('Error adding product:', error)
      toast({
        title: "Error",
        description: "No se pudo añadir el producto",
        variant: "destructive"
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      setProducts(products.filter(p => p.id !== id))
      toast({
        title: "Producto eliminado",
        description: "El producto se ha eliminado correctamente"
      })
    } catch (error) {
      console.error('Error deleting product:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <AddProductDialog onAddProduct={handleAddProduct} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  )
}