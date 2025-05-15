
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Package, Search, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { AiraloProduct } from "@/types/airalo"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export function AiraloProducts() {
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<AiraloProduct[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [regions, setRegions] = useState<string[]>([])
  
  // Cargar productos - simulado por ahora
  const fetchProducts = async () => {
    setIsLoading(true)
    
    try {
      // Aquí se implementará la llamada a la API
      // Por ahora, usamos datos de prueba
      const mockProducts: AiraloProduct[] = [
        {
          id: "1",
          airalo_product_id: "airalo-001",
          name: "Europa Unlimited",
          description: "Datos ilimitados en toda Europa",
          countries: ["España", "Francia", "Italia", "Alemania"],
          validity_days: 30,
          data_amount: 20,
          price: 2999,
          currency: "EUR",
          is_popular: true
        },
        {
          id: "2",
          airalo_product_id: "airalo-002",
          name: "América del Norte",
          description: "Cobertura en EEUU, Canadá y México",
          countries: ["Estados Unidos", "Canadá", "México"],
          validity_days: 15,
          data_amount: 10,
          price: 1999,
          currency: "EUR"
        },
        {
          id: "3",
          airalo_product_id: "airalo-003",
          name: "Asia Premium",
          description: "Conexión de alta velocidad en Asia",
          countries: ["Japón", "Corea del Sur", "China", "Tailandia"],
          validity_days: 10,
          data_amount: 5,
          price: 1599,
          currency: "EUR"
        }
      ]
      
      setProducts(mockProducts)
      
      // Extraer regiones únicas de los productos
      const uniqueRegions = Array.from(
        new Set(mockProducts.flatMap(p => p.countries))
      ).sort()
      
      setRegions(uniqueRegions)
    } catch (error) {
      toast({
        title: "Error al cargar productos",
        description: "No se pudieron cargar los productos de Airalo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRegion = !selectedRegion || 
      product.countries.some(country => 
        country.toLowerCase() === selectedRegion.toLowerCase()
      )
    
    return matchesSearch && matchesRegion
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Productos de Airalo
          </CardTitle>
          <CardDescription>
            Explora los productos de eSIM disponibles a través de Airalo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <select 
                className="border rounded p-2 w-full"
                value={selectedRegion || ""}
                onChange={(e) => setSelectedRegion(e.target.value || null)}
              >
                <option value="">Todas las regiones</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            
            <Button variant="outline" onClick={fetchProducts} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border rounded-lg p-4">
                  <Skeleton className="h-6 w-1/4 mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex gap-2 mb-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center p-6 text-muted-foreground">
                  No se encontraron productos que coincidan con tu búsqueda.
                </div>
              ) : (
                filteredProducts.map(product => (
                  <div key={product.id} className="border rounded-lg p-4 hover:border-brand-200 transition-colors">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      {product.is_popular && (
                        <Badge className="bg-brand-500">Popular</Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-2 mb-2">
                      <Badge variant="outline">{product.data_amount} GB</Badge>
                      <Badge variant="outline">{product.validity_days} días</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.countries.map(country => (
                        <Badge key={country} variant="secondary" className="text-xs">
                          {country}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="font-semibold text-lg">
                        {(product.price / 100).toFixed(2)} {product.currency}
                      </div>
                      <Button size="sm">
                        Importar Producto
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
