import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/utils/currency"
import { Switch } from "@/components/ui/switch"
import { supabase } from "@/integrations/supabase/client"

export function EcommerceSettings() {
  const { toast } = useToast()
  const [currency] = useState("MXN")
  const [taxRate, setTaxRate] = useState("16")
  const [isLoading, setIsLoading] = useState(false)
  const [isSandboxMode, setIsSandboxMode] = useState(true)
  const [settingsId, setSettingsId] = useState<string | null>(null)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('id, stripe_sandbox_mode')
          .single()

        if (error) throw error

        if (data) {
          setSettingsId(data.id)
          setIsSandboxMode(data.stripe_sandbox_mode)
        }
      } catch (error) {
        console.error('Error al cargar configuración:', error)
        toast({
          title: "Error",
          description: "No se pudo cargar la configuración",
          variant: "destructive",
        })
      }
    }

    loadSettings()
  }, [toast])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      if (!settingsId) throw new Error('No se encontró ID de configuración')

      const { error } = await supabase
        .from('site_settings')
        .update({ 
          stripe_sandbox_mode: isSandboxMode,
          updated_at: new Date().toISOString()
        })
        .eq('id', settingsId)

      if (error) throw error

      toast({
        title: "Configuración guardada",
        description: "Los cambios en configuración monetaria se han guardado correctamente.",
      })
    } catch (error) {
      console.error('Error al guardar:', error)
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Ejemplo de precio formateado
  const examplePrice = 1234.56
  const formattedPrice = formatCurrency(examplePrice)

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
          <div className="flex items-center justify-between">
            <Label htmlFor="sandbox-mode">Modo Sandbox de Stripe</Label>
            <Switch
              id="sandbox-mode"
              checked={isSandboxMode}
              onCheckedChange={setIsSandboxMode}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {isSandboxMode 
              ? "Usando claves de prueba (sandbox) - Ideal para desarrollo y pruebas" 
              : "Usando claves de producción - ¡Cuidado! Se procesarán pagos reales"}
          </p>
          {!isSandboxMode && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-2">
              <p className="text-sm text-yellow-800">
                <strong>¡Atención!</strong> Has activado el modo producción. Todos los pagos serán procesados como transacciones reales.
              </p>
            </div>
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
            <strong>Nota:</strong> Actualmente la plataforma opera exclusivamente en Pesos Mexicanos (MXN).
            El soporte para múltiples monedas estará disponible en futuras actualizaciones.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}