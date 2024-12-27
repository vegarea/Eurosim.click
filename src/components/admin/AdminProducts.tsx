import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ProductCard } from "./products/ProductCard"
import { AddProductDialog } from "./products/AddProductDialog"

interface Product {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  features: string[]
  europeGB?: number
  spainGB?: number
}

const initialProducts: Product[] = [
  {
    id: "sim-xl",
    type: "physical",
    title: "Prepago XL",
    description: "16GB Europa / 160GB España",
    price: 890,
    features: [
      "16GB datos en toda Europa",
      "160GB exclusivo España",
      "Velocidad 5G/4G/3G+",
      "SIM card incluida",
      "30 días de validez",
      "Hotspot incluido"
    ]
  },
  {
    id: "sim-xxl",
    type: "physical",
    title: "Prepago XXL",
    description: "22GB Europa / 190GB España",
    price: 1090,
    features: [
      "22GB datos en toda Europa",
      "190GB exclusivo España",
      "300 min llamadas internacionales",
      "Velocidad 5G/4G/3G+",
      "SIM card incluida",
      "30 días de validez"
    ]
  },
  {
    id: "esim-s",
    type: "esim",
    title: "E-SIM S",
    description: "8GB Europa / 100GB España",
    price: 419,
    features: [
      "8GB datos en toda Europa",
      "100GB exclusivo España",
      "Activación instantánea",
      "Velocidad 5G/4G/3G+",
      "30 días de validez"
    ],
    europeGB: 8,
    spainGB: 100
  },
  {
    id: "esim-m",
    type: "esim",
    title: "E-SIM M",
    description: "11GB Europa / 140GB España",
    price: 587,
    features: [
      "11GB datos en toda Europa",
      "140GB exclusivo España",
      "Activación instantánea",
      "Velocidad 5G/4G/3G+",
      "30 días de validez"
    ],
    europeGB: 11,
    spainGB: 140
  },
  {
    id: "esim-l",
    type: "esim",
    title: "E-SIM L",
    description: "16GB Europa / 160GB España",
    price: 817,
    features: [
      "16GB datos en toda Europa",
      "160GB exclusivo España",
      "Activación instantánea",
      "Velocidad 5G/4G/3G+",
      "30 días de validez",
      "Soporte prioritario"
    ],
    europeGB: 16,
    spainGB: 160
  },
  {
    id: "esim-xl",
    type: "esim",
    title: "E-SIM XL",
    description: "22GB Europa / 190GB España",
    price: 1027,
    features: [
      "22GB datos en toda Europa",
      "190GB exclusivo España",
      "Activación instantánea",
      "Velocidad 5G/4G/3G+",
      "30 días de validez",
      "Soporte prioritario"
    ],
    europeGB: 22,
    spainGB: 190
  }
]

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const { toast } = useToast()

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product])
    toast({
      title: "Producto añadido",
      description: "El producto se ha añadido correctamente"
    })
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
    toast({
      title: "Producto eliminado",
      description: "El producto se ha eliminado correctamente"
    })
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