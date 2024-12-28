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
import { Pencil } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { Product } from "./types"
import { formatCurrency } from "@/utils/currency"

interface EditProductDialogProps {
  product: Product
  onEdit: (id: string, updates: Partial<Product>) => void
}

export function EditProductDialog({ product, onEdit }: EditProductDialogProps) {
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({
    ...product,
    price: product.price / 100 // Convertir centavos a pesos para la edición
  })
  const [open, setOpen] = useState(false)

  const handleEdit = () => {
    if (!editedProduct.title || !editedProduct.description || editedProduct.price === undefined) {
      return
    }

    // Convertir el precio de pesos a centavos antes de guardar
    const updates = {
      ...editedProduct,
      price: Math.round(editedProduct.price * 100)
    }

    onEdit(product.id, updates)
    setOpen(false)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Permitir entrada vacía
    if (value === '') {
      setEditedProduct({ ...editedProduct, price: 0 })
      return
    }

    // Remover cualquier caracter que no sea número
    const numericValue = value.replace(/[^\d]/g, '')
    
    // Convertir a número y dividir por 100 para manejar decimales
    const price = parseInt(numericValue, 10) / 100
    
    setEditedProduct({ ...editedProduct, price })
  }

  const formatPriceForInput = (price: number) => {
    return (Math.round(price * 100) / 100).toFixed(2)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Producto</Label>
            <Select
              value={editedProduct.type}
              onValueChange={(value) => setEditedProduct({ ...editedProduct, type: value as "physical" | "esim" })}
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
              value={editedProduct.title || ""}
              onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={editedProduct.description || ""}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Precio (MXN)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="price"
                type="text"
                className="pl-7"
                value={formatPriceForInput(editedProduct.price || 0)}
                onChange={handlePriceChange}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(editedProduct.price || 0)}
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="features">Características (una por línea)</Label>
            <Textarea
              id="features"
              value={editedProduct.features?.join("\n") || ""}
              onChange={(e) => setEditedProduct({ ...editedProduct, features: e.target.value.split("\n").filter(f => f.trim()) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="data_eu_gb">GB en Europa</Label>
            <Input
              id="data_eu_gb"
              type="number"
              value={editedProduct.data_eu_gb || ""}
              onChange={(e) => setEditedProduct({ ...editedProduct, data_eu_gb: parseFloat(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="data_es_gb">GB en España</Label>
            <Input
              id="data_es_gb"
              type="number"
              value={editedProduct.data_es_gb || ""}
              onChange={(e) => setEditedProduct({ ...editedProduct, data_es_gb: parseFloat(e.target.value) })}
            />
          </div>
          {editedProduct.type === "physical" && (
            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={editedProduct.stock || ""}
                onChange={(e) => setEditedProduct({ ...editedProduct, stock: parseFloat(e.target.value) })}
              />
            </div>
          )}
          <Button onClick={handleEdit}>Guardar Cambios</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}