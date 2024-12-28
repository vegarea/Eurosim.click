import { ProductCard } from "./ProductCard"

interface Product {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  features: string[]
  data_eu_gb?: number
  data_es_gb?: number
  status: "active" | "inactive" | "out_of_stock"
}

interface ProductListProps {
  products: Product[]
  onDelete: (id: string) => void
}

export function ProductList({ products, onDelete }: ProductListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            ...product,
            europeGB: product.data_eu_gb,
            spainGB: product.data_es_gb
          }}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}