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
import type { Tables } from "@/integrations/supabase/types"

type Product = Tables<"products">

interface AddProductDialogProps {
  onAddProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    type: "physical",
    features: [],
    status: "active"
  })

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      return
    }

    onAddProduct({
      type: newProduct.type || "physical",
      title: newProduct.title,
      description: newProduct.description,
      price: Number(newProduct.price),
      features: newProduct.features || [],
      status: "active",
      europe_gb: newProduct.type === "esim" ? Number(newProduct.europe_gb) : null,
      spain_gb: newProduct.type === "esim" ? Number(newProduct.spain_gb) : null,
      stock: newProduct.type === "physical" ? Number(newProduct.stock) : null,
      metadata: null
    })

    setNewProduct({ type: "physical", features: [], status: "active" })
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
            <Label htmlFor="price">Precio (centavos MXN)</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price || ""}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
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
                  value={newProduct.europe_gb || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, europe_gb: parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="spainGB">GB en España</Label>
                <Input
                  id="spainGB"
                  type="number"
                  value={newProduct.spain_gb || ""}
                  onChange={(e) => setNewProduct({ ...newProduct, spain_gb: parseInt(e.target.value) })}
                />
              </div>
            </>
          )}
          {newProduct.type === "physical" && (
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock Disponible</Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock || ""}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
              />
            </div>
          )}
          <Button onClick={handleAddProduct}>Añadir Producto</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}