import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function EcommerceSettings() {
  const { toast } = useToast()
  const [currency, setCurrency] = useState("EUR")
  const [taxRate, setTaxRate] = useState("16")

  const handleSave = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios en configuración monetaria se han guardado correctamente.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Configuración monetaria
        </CardTitle>
        <CardDescription>
          Define la moneda principal y otras opciones monetarias
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currency">Moneda principal</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una moneda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="USD">USD - Dólar estadounidense</SelectItem>
              <SelectItem value="MXN">MXN - Peso mexicano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tax-rate">Tasa de impuestos (%)</Label>
          <Input
            id="tax-rate"
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
          />
        </div>
        <Button onClick={handleSave}>Guardar cambios</Button>
      </CardContent>
    </Card>
  )
}