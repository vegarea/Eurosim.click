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
  europeGB?: number
  spainGB?: number
}

interface AddProductDialogProps {
  onAddProduct: (product: Product) => void
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    type: "physical",
    features: []
  })

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
      ...(newProduct.type === "esim" ? {
        europeGB: Number(newProduct.europeGB),
        spainGB: Number(newProduct.spainGB)
      } : {})
    }

    onAddProduct(product)
    setNewProduct({ type: "physical", features: [] })
  }

  return (
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
  )
}