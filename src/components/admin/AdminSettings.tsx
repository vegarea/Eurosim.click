import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Image, DollarSign, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function AdminSettings() {
  const { toast } = useToast()
  const [logo, setLogo] = useState("/logo.png")
  const [currency, setCurrency] = useState("EUR")
  const [darkMode, setDarkMode] = useState(false)

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // En un caso real, aquí subirías el archivo a un servidor
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
        toast({
          title: "Logo actualizado",
          description: "El nuevo logo se ha guardado correctamente.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCurrencyChange = (value: string) => {
    setCurrency(value)
    toast({
      title: "Moneda actualizada",
      description: "La moneda principal se ha actualizado correctamente.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Administra la configuración general de tu aplicación
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Logo de la aplicación
            </CardTitle>
            <CardDescription>
              Personaliza el logo que se mostrará en toda la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg">
              <img src={logo} alt="Logo actual" className="max-h-32 object-contain" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="w-full" onClick={() => document.getElementById('logo-upload')?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Subir nuevo logo
              </Button>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>
          </CardContent>
        </Card>

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
              <Select value={currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="USD">USD - Dólar estadounidense</SelectItem>
                  <SelectItem value="GBP">GBP - Libra esterlina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mostrar decimales</Label>
                <p className="text-sm text-muted-foreground">
                  Mostrar céntimos en los precios
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}