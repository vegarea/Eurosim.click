import { AddProductDialog } from "./AddProductDialog"

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

interface ProductHeaderProps {
  onAddProduct: (product: Product) => void
}

export function ProductHeader({ onAddProduct }: ProductHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Gestión de Productos</h1>
      <AddProductDialog onAddProduct={onAddProduct} />
    </div>
  )
}