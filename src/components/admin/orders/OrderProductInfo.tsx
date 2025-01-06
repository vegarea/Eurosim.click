import { useQuery } from "@tanstack/react-query"
import { UIOrder } from "@/types/ui/orders"
import { Package2, CreditCard, Wifi } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { Product } from "@/types/database/products"
import { Skeleton } from "@/components/ui/skeleton"

interface OrderProductInfoProps {
  order: UIOrder
}

export function OrderProductInfo({ order }: OrderProductInfoProps) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', order.product_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', order.product_id)
        .single()

      if (error) throw error
      return data as Product
    }
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package2 className="h-5 w-5 text-gray-500" />
            Detalles del Producto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!product) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package2 className="h-5 w-5 text-gray-500" />
            Detalles del Producto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Producto no encontrado
          </p>
        </CardContent>
      </Card>
    )
  }

  const features = Array.isArray(product.features) ? product.features : []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package2 className="h-5 w-5 text-gray-500" />
          Detalles del Producto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-1">Producto</h3>
            <div className="flex items-center gap-2">
              {product.type === 'physical' ? (
                <CreditCard className="h-4 w-4 text-primary" />
              ) : (
                <Wifi className="h-4 w-4 text-primary" />
              )}
              <span>{product.title}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-1">Tipo de SIM</h3>
            <Badge variant="secondary" className="capitalize">
              {product.type === 'physical' ? 'SIM Física' : 'eSIM'}
            </Badge>
          </div>

          <div>
            <h3 className="font-medium mb-1">Datos en Europa</h3>
            <p className="font-semibold text-primary">
              {product.data_eu_gb}GB
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Datos en España</h3>
            <p className="font-semibold text-primary">
              {product.data_es_gb}GB
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Cantidad</h3>
            <p>{order.quantity}</p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Precio</h3>
            <p className="font-semibold">${(order.total_amount / 100).toFixed(2)} MXN</p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Validez</h3>
            <p>{product.validity_days} días</p>
          </div>

          <div>
            <h3 className="font-medium mb-1">Estado del Producto</h3>
            <Badge variant={product.status === 'active' ? 'default' : 'destructive'}>
              {product.status === 'active' ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>

          {product.type === 'physical' && (
            <div>
              <h3 className="font-medium mb-1">Stock Disponible</h3>
              <p>{product.stock || 0} unidades</p>
            </div>
          )}
        </div>

        {product.description && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Descripción</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>
        )}

        {features.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Características</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {features.map((feature, index) => (
                <li key={index}>{String(feature)}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}