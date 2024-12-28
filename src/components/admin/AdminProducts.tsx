import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ProductCard } from "./products/ProductCard"
import { AddProductDialog } from "./products/AddProductDialog"
import { supabase } from "@/integrations/supabase/client"

interface Product {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  features: string[]
  data_eu_gb?: number
  data_es_gb?: number
  created_at: Date
  updated_at: Date
  status: "active" | "inactive"
  stock?: number
  metadata?: Record<string, any>
}

interface SupabaseProduct {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  features: unknown
  data_eu_gb: number
  data_es_gb: number
  created_at: string
  updated_at: string
  status: "active" | "inactive" | "out_of_stock"
  stock: number | null
  metadata: Record<string, any> | null
}

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const transformSupabaseProduct = (product: SupabaseProduct): Product => {
    return {
      ...product,
      features: Array.isArray(product.features) ? product.features : [],
      created_at: new Date(product.created_at),
      updated_at: new Date(product.updated_at),
      metadata: product.metadata || undefined,
      stock: product.stock || undefined
    }
  }

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      const transformedProducts = (data as SupabaseProduct[]).map(transformSupabaseProduct)
      setProducts(transformedProducts)
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

  const handleAddProduct = async (product: Product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          title: product.title,
          description: product.description,
          type: product.type,
          price: product.price,
          features: product.features,
          data_eu_gb: product.data_eu_gb,
          data_es_gb: product.data_es_gb,
          status: 'active',
          stock: product.type === 'physical' ? product.stock : null,
          validity_days: 30 // Default value
        }])
        .select()

      if (error) throw error

      const transformedNewProducts = (data as SupabaseProduct[]).map(transformSupabaseProduct)
      setProducts([...transformedNewProducts, ...products])
      
      toast({
        title: "Producto añadido",
        description: "El producto se ha añadido correctamente"
      })
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
    return <div>Cargando productos...</div>
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
            product={{
              ...product,
              europeGB: product.data_eu_gb,
              spainGB: product.data_es_gb
            }}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </div>
  )
}