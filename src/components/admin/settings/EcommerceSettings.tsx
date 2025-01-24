import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Save, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/utils/currency"
import { supabase } from "@/integrations/supabase/client"

export function EcommerceSettings() {
  const { toast } = useToast()
  const [currency] = useState("MXN")
  const [taxRate, setTaxRate] = useState("16")
  const [isLoading, setIsLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState("")
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  useEffect(() => {
    loadExchangeRate()
  }, [])

  const loadExchangeRate = async () => {
    const { data, error } = await supabase
      .from('exchange_rates')
      .select('*')
      .eq('from_currency', 'EUR')
      .eq('to_currency', 'MXN')
      .single()

    if (error) {
      console.error('Error loading exchange rate:', error)
      return
    }

    if (data) {
      setExchangeRate(data.rate.toString())
      setLastUpdated(new Date(data.last_updated).toLocaleString())
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    try {
      // Actualizar tipo de cambio
      const { error: exchangeError } = await supabase
        .from('exchange_rates')
        .upsert({
          from_currency: 'EUR',
          to_currency: 'MXN',
          rate: parseFloat(exchangeRate),
          last_updated: new Date().toISOString()
        }, {
          onConflict: 'from_currency,to_currency'
        })

      if (exchangeError) throw exchangeError

      toast({
        title: "Configuración guardada",
        description: "Los cambios en configuración monetaria se han guardado correctamente.",
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      toast({
        title: "Error",
        description: "Hubo un error al guardar la configuración.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Ejemplo de precio formateado
  const examplePrice = 1234.56
  const formattedPrice = formatCurrency(examplePrice)

  return (
    <div className="space-y-6">
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
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currency">Moneda principal</Label>
            <Select 
              value={currency} 
              disabled={true}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una moneda" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MXN">MXN - Peso mexicano</SelectItem>
                <SelectItem value="USD" disabled>USD - Dólar estadounidense (próximamente)</SelectItem>
                <SelectItem value="EUR" disabled>EUR - Euro (próximamente)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Ejemplo de formato: {formattedPrice}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tax-rate">Tasa de impuestos (%)</Label>
            <Input
              id="tax-rate"
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Este porcentaje se aplicará a todas las ventas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exchange-rate">
              Tipo de cambio EUR/MXN
            </Label>
            <div className="flex gap-2">
              <Input
                id="exchange-rate"
                type="number"
                step="0.0001"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                placeholder="Ej: 18.5000"
              />
              <Button 
                variant="outline"
                onClick={loadExchangeRate}
                type="button"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground">
                Última actualización: {lastUpdated}
              </p>
            )}
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-yellow-800">
              <strong>Nota:</strong> El tipo de cambio se utiliza para actualizar automáticamente los precios en MXN basados en los precios base en EUR.
              Los cambios en el tipo de cambio actualizarán los precios de todos los productos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}