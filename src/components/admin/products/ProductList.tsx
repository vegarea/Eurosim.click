import { ProductCard } from "./ProductCard"
import { Product } from "./types"

interface ProductListProps {
  products: Product[]
  onDelete: (id: string) => void
  onEdit: (id: string, updates: Partial<Product>) => void
}

export function ProductList({ products, onDelete, onEdit }: ProductListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}