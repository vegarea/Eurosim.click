import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Wifi, CreditCard, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    id: "sim-m",
    type: "physical",
    title: "Tarifa M",
    description: "10GB para usar en Europa",
    price: 24.99,
    features: [
      "Válido por 30 días",
      "Cobertura en toda la UE",
      "Datos 4G/5G",
      "Soporte 24/7"
    ]
  },
  {
    id: "sim-l",
    type: "physical",
    title: "Tarifa L",
    description: "20GB para usar en Europa",
    price: 34.99,
    features: [
      "Válido por 30 días",
      "Cobertura en toda la UE",
      "Datos 4G/5G",
      "Soporte 24/7",
      "Llamadas incluidas"
    ]
  },
  {
    id: "esim-m",
    type: "esim",
    title: "E-SIM M",
    description: "15GB para usar en Europa",
    price: 29.99,
    features: [
      "Activación instantánea",
      "Válido por 30 días",
      "Cobertura en toda la UE",
      "Datos 4G/5G"
    ],
    europeGB: 10,
    spainGB: 5
  },
  {
    id: "esim-l",
    type: "esim",
    title: "E-SIM L",
    description: "30GB para usar en Europa",
    price: 39.99,
    features: [
      "Activación instantánea",
      "Válido por 30 días",
      "Cobertura en toda la UE",
      "Datos 4G/5G",
      "Soporte prioritario"
    ],
    europeGB: 20,
    spainGB: 10
  }
]

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    type: "physical",
    features: []
  })
  const { toast } = useToast()

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor completa todos los campos requeridos"
      })
      return
    }

    const product: Product = {
      id: `${newProduct.type}-${newProduct.title?.toLowerCase().replace(/\s+/g, '-')}`,
      type: newProduct.type as "physical" | "esim",
      title: newProduct.title,
      description: newProduct.description,
      price: Number(newProduct.price),
      features: newProduct.features || [],
      ...(newProduct.type === "esim" ? {
        europeGB: Number(newProduct.europeGB),
        spainGB: Number(newProduct.spainGB)
      } : {})
    }

    setProducts([...products, product])
    setNewProduct({ type: "physical", features: [] })
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Añadir Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Producto</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Producto</Label>
                <Select
                  value={newProduct.type}
                  onValueChange={(value) => setNewProduct({ ...newProduct, type: value as "physical" | "esim" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">SIM Física</SelectItem>
                    <SelectItem value="esim">E-SIM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={newProduct.title || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={newProduct.description || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Precio (MXN)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="features">Características (una por línea)</Label>
                <Textarea
                  id="features"
                  value={newProduct.features?.join("\n") || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, features: e.target.value.split("\n").filter(f => f.trim()) })}
                />
              </div>
              {newProduct.type === "esim" && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="europeGB">GB en Europa</Label>
                    <Input
                      id="europeGB"
                      type="number"
                      value={newProduct.europeGB || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, europeGB: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="spainGB">GB en España</Label>
                    <Input
                      id="spainGB"
                      type="number"
                      value={newProduct.spainGB || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, spainGB: parseFloat(e.target.value) })}
                    />
                  </div>
                </>
              )}
              <Button onClick={handleAddProduct}>Añadir Producto</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              {product.type === "physical" ? (
                <CreditCard className="w-6 h-6 text-primary" />
              ) : (
                <Wifi className="w-6 h-6 text-primary" />
              )}
              <div>
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-2xl font-bold text-primary">
                ${product.price}
                <span className="text-sm font-normal text-muted-foreground ml-1">MXN</span>
              </p>
            </div>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            {product.type === "esim" && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  GB Europa: {product.europeGB} / España: {product.spainGB}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}