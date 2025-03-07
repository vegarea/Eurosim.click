import { Wifi, CreditCard, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditProductDialog } from "./EditProductDialog"
import { Product } from "./types"

interface ProductCardProps {
  product: Product & {
    europeGB?: number
    spainGB?: number
  }
  onDelete: (id: string) => void
  onEdit: (id: string, updates: Partial<Product>) => void
}

export function ProductCard({ product, onDelete, onEdit }: ProductCardProps) {
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="absolute top-4 right-4 flex gap-2">
        <EditProductDialog product={product} onEdit={onEdit} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(product.id)}
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
          ${Math.floor(product.price / 100)}
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
  )
}