import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { ProductHeader } from "./products/ProductHeader"
import { ProductList } from "./products/ProductList"
import { Product, SupabaseProduct } from "./products/types"

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

  const updateAIContext = async () => {
    try {
      const { error } = await supabase.functions.invoke('update-ai-context')
      if (error) throw error
      
      console.log('AI context updated successfully')
    } catch (error) {
      console.error('Error updating AI context:', error)
      toast({
        title: "Advertencia",
        description: "Se actualizaron los productos pero hubo un error al actualizar el contexto del asistente virtual",
        variant: "destructive"
      })
    }
  }

  const fetchProducts = async () => {
    try {
      console.log("Fetching products from database...")
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching products:', error)
        throw error
      }

      console.log("Products fetched:", data)
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
      const { data: session } = await supabase.auth.getSession()
      console.log("Current session:", session)

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
          validity_days: 30
        }])
        .select()

      if (error) {
        console.error('Error details:', error)
        throw error
      }

      const transformedNewProducts = (data as SupabaseProduct[]).map(transformSupabaseProduct)
      setProducts([...transformedNewProducts, ...products])
      
      // Update AI context after adding product
      await updateAIContext()
      
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

  const handleEditProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data: session } = await supabase.auth.getSession()
      console.log("Current session for edit:", session)
      console.log('Actualizando producto. ID:', id)
      console.log('Datos de actualización:', updates)

      const priceInCents = typeof updates.price === 'number' ? 
        Math.round(updates.price * 100) : updates.price

      const { created_at, updated_at, ...updateFields } = updates

      const updateData = {
        ...updateFields,
        price: priceInCents,
        features: Array.isArray(updates.features) ? updates.features : [],
        stock: updates.type === 'physical' ? updates.stock : null,
      }

      console.log('Datos finales para actualización:', updateData)

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()

      if (error) {
        console.error('Error de Supabase:', error)
        throw error
      }

      console.log('Respuesta de Supabase:', data)

      // Recargar todos los productos para asegurar datos actualizados
      await fetchProducts()
      
      // Update AI context after editing product
      await updateAIContext()
      
      toast({
        title: "Producto actualizado",
        description: "El producto se ha actualizado correctamente"
      })
    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto",
        variant: "destructive"
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    try {
      const { data: session } = await supabase.auth.getSession()
      console.log("Current session for delete:", session)

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error details:', error)
        throw error
      }

      setProducts(products.filter(p => p.id !== id))
      
      // Update AI context after deleting product
      await updateAIContext()
      
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
      <ProductHeader onAddProduct={handleAddProduct} />
      <ProductList 
        products={products} 
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />
    </div>
  )
}