import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/utils/currency"

export function EcommerceSettings() {
  // Ejemplo de precio formateado
  const examplePrice = 1234.56
  const formattedPrice = formatCurrency(examplePrice)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración de E-commerce</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Ejemplo de precio formateado</Label>
          <Input value={formattedPrice} readOnly />
        </div>
      </CardContent>
    </Card>
  )
}