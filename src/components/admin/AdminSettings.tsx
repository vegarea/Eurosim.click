import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image, DollarSign, Upload, Building2, ShoppingCart, Search, Palette, Plug } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ApiKeySetup } from "./emails/ApiKeySetup"

export function AdminSettings() {
  const { toast } = useToast()
  const [logo, setLogo] = useState("/logo.png")
  const [companyName, setCompanyName] = useState("Mi Empresa")
  const [currency, setCurrency] = useState("EUR")
  const [taxRate, setTaxRate] = useState("16")
  const [metaTitle, setMetaTitle] = useState("Mi Tienda de SIMs")
  const [metaDescription, setMetaDescription] = useState("Venta de SIMs y eSIMs para viajeros")
  const [theme, setTheme] = useState("light")
  const [primaryColor, setPrimaryColor] = useState("#9b87f5")
  const [zapierWebhook, setZapierWebhook] = useState("")

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
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

  const handleSave = (section: string) => {
    toast({
      title: "Cambios guardados",
      description: `Los cambios en ${section} se han guardado correctamente.`,
    })
  }

  const handleZapierTest = async () => {
    if (!zapierWebhook) {
      toast({
        title: "Error",
        description: "Por favor ingresa una URL de webhook válida",
        variant: "destructive",
      })
      return
    }

    try {
      await fetch(zapierWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
        }),
      })

      toast({
        title: "Prueba enviada",
        description: "Se ha enviado una prueba al webhook de Zapier",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo conectar con Zapier",
        variant: "destructive",
      })
    }
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

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="bg-brand-50">
          <TabsTrigger value="company" className="data-[state=active]:bg-white">
            <Building2 className="mr-2 h-4 w-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="ecommerce" className="data-[state=active]:bg-white">
            <ShoppingCart className="mr-2 h-4 w-4" />
            E-commerce
          </TabsTrigger>
          <TabsTrigger value="seo" className="data-[state=active]:bg-white">
            <Search className="mr-2 h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="style" className="data-[state=active]:bg-white">
            <Palette className="mr-2 h-4 w-4" />
            Estilo
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-white">
            <Plug className="mr-2 h-4 w-4" />
            Integraciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Identidad de marca
              </CardTitle>
              <CardDescription>
                Personaliza la identidad visual de tu empresa
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
              <div className="space-y-2">
                <Label htmlFor="company-name">Nombre de la empresa</Label>
                <Input
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <Button onClick={() => handleSave('identidad de marca')}>Guardar cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ecommerce" className="space-y-4">
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
              <Button onClick={() => handleSave('configuración monetaria')}>Guardar cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Configuración SEO
              </CardTitle>
              <CardDescription>
                Optimiza tu sitio para motores de búsqueda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Título meta predeterminado</Label>
                <Input
                  id="meta-title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Descripción meta predeterminada</Label>
                <Input
                  id="meta-description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </div>
              <Button onClick={() => handleSave('configuración SEO')}>Guardar cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Estilo de Interfaz
              </CardTitle>
              <CardDescription>
                Personaliza la apariencia de tu aplicación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-color">Color Principal</Label>
                <div className="flex gap-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-20 h-10 p-1"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>
              <Button onClick={() => handleSave('estilo de interfaz')}>Guardar cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plug className="h-5 w-5" />
                Integraciones
              </CardTitle>
              <CardDescription>
                Conecta tu aplicación con servicios externos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Brevo (Email)</h3>
                  <ApiKeySetup />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Zapier</h3>
                  <Label htmlFor="zapier">Webhook de Zapier</Label>
                  <div className="flex gap-2">
                    <Input
                      id="zapier"
                      value={zapierWebhook}
                      onChange={(e) => setZapierWebhook(e.target.value)}
                      placeholder="https://hooks.zapier.com/..."
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleZapierTest}>
                      Probar
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Conecta con Zapier para automatizar tareas y sincronizar datos con otras aplicaciones
                  </p>
                </div>
              </div>
              <Button onClick={() => handleSave('integraciones')}>Guardar cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
