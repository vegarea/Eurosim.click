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
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

interface Product {
  id: string
  type: "physical" | "esim"
  title: string
  description: string
  price: number
  features: string[]
  data_eu_gb?: number
  data_es_gb?: number
  stock?: number
}

interface AddProductDialogProps {
  onAddProduct: (product: Product) => void
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    type: "physical",
    features: []
  })
  const [open, setOpen] = useState(false)

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      return
    }

    const product: Product = {
      id: `${newProduct.type}-${newProduct.title?.toLowerCase().replace(/\s+/g, '-')}`,
      type: newProduct.type as "physical" | "esim",
      title: newProduct.title,
      description: newProduct.description,
      price: Number(newProduct.price),
      features: newProduct.features || [],
      data_eu_gb: Number(newProduct.data_eu_gb),
      data_es_gb: Number(newProduct.data_es_gb),
      stock: newProduct.type === 'physical' ? Number(newProduct.stock) : undefined
    }

    onAddProduct(product)
    setNewProduct({ type: "physical", features: [] })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Label htmlFor="price">Precio (MXN en centavos)</Label>
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
          <div className="grid gap-2">
            <Label htmlFor="data_eu_gb">GB en Europa</Label>
            <Input
              id="data_eu_gb"
              type="number"
              value={newProduct.data_eu_gb || ""}
              onChange={(e) => setNewProduct({ ...newProduct, data_eu_gb: parseFloat(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="data_es_gb">GB en España</Label>
            <Input
              id="data_es_gb"
              type="number"
              value={newProduct.data_es_gb || ""}
              onChange={(e) => setNewProduct({ ...newProduct, data_es_gb: parseFloat(e.target.value) })}
            />
          </div>
          {newProduct.type === "physical" && (
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock || ""}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseFloat(e.target.value) })}
              />
            </div>
          )}
          <Button onClick={handleAddProduct}>Añadir Producto</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}