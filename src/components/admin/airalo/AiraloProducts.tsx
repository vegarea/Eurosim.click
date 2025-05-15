
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  RefreshCw, Package, Search, MapPin, Globe, Radio, 
  ExternalLink, Smartphone, Clock 
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { AiraloPackage } from "@/types/airalo/api-types"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useAiraloClient } from "@/hooks/useAiraloClient"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AiraloProducts() {
  const { toast } = useToast()
  const { 
    getPackages, 
    getCountries,
    isLoading: isClientLoading, 
    error: clientError 
  } = useAiraloClient()
  
  // State
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<AiraloPackage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [countries, setCountries] = useState<{code: string, name: string}[]>([])
  const [packageType, setPackageType] = useState<'all' | 'local' | 'global'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [includeTopups, setIncludeTopups] = useState(false)
  
  // Load countries
  useEffect(() => {
    loadCountries()
  }, [])
  
  // Load products when filters change
  useEffect(() => {
    loadProducts()
  }, [packageType, selectedCountry, currentPage, includeTopups])

  // Load countries from API
  const loadCountries = async () => {
    try {
      const countriesData = await getCountries()
      if (Array.isArray(countriesData)) {
        const formattedCountries = countriesData.map(country => ({
          code: country.country_code,
          name: country.name
        }))
        setCountries(formattedCountries)
      }
    } catch (error) {
      console.error("Error loading countries:", error)
      toast({
        title: "Error al cargar países",
        description: "No se pudieron cargar los países disponibles.",
        variant: "destructive",
      })
    }
  }
  
  // Load products from API
  const loadProducts = async () => {
    setIsLoading(true)
    
    try {
      const params: any = {
        page: currentPage,
        limit: 10
      }
      
      // Add type filter if not "all"
      if (packageType !== 'all') {
        params['filter[type]'] = packageType
      }
      
      // Add country filter if selected
      if (selectedCountry) {
        params['filter[country]'] = selectedCountry
      }
      
      // Include topups if selected
      if (includeTopups) {
        params.include = 'topup'
      }
      
      const packagesData = await getPackages(params)
      
      // For now, we're assuming a fixed number of pages since we don't have pagination info
      setTotalPages(Math.ceil(packagesData.length / 10) || 1)
      setProducts(packagesData)
      
      if (clientError) {
        throw new Error(clientError)
      }
    } catch (error) {
      console.error("Error loading products:", error)
      toast({
        title: "Error al cargar productos",
        description: "No se pudieron cargar los productos de Airalo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Reset filters and reload
  const handleRefresh = () => {
    setSearchTerm('')
    setSelectedCountry('')
    setPackageType('all')
    setCurrentPage(1)
    setIncludeTopups(false)
    loadProducts()
  }
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.package?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Get badge variant based on plan type
  const getPlanTypeBadge = (planType: string) => {
    switch (planType) {
      case 'data-voice-text':
        return <Badge variant="default" className="bg-purple-500">Datos + Voz + SMS</Badge>
      case 'data-voice':
        return <Badge variant="default" className="bg-blue-500">Datos + Voz</Badge>
      default:
        return <Badge variant="default">Solo Datos</Badge>
    }
  }

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
          <div className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select
                value={packageType}
                onValueChange={(value: 'all' | 'local' | 'global') => setPackageType(value)}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Tipo de cobertura" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="local">Local (un país)</SelectItem>
                  <SelectItem value="global">Global/Regional</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="País" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos los países</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  Actualizar
                </Button>
                
                <Button
                  variant={includeTopups ? "default" : "outline"}
                  onClick={() => setIncludeTopups(!includeTopups)}
                  disabled={isLoading}
                >
                  <Radio className="mr-2 h-4 w-4" />
                  Recargas
                </Button>
              </div>
            </div>
            
            {/* Products List */}
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
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-muted-foreground text-sm">{product.package}</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {getPlanTypeBadge(product.plan_type)}
                          {product.is_unlimited && (
                            <Badge variant="outline" className="border-green-500 text-green-700">
                              Ilimitado
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ExternalLink className="h-3 w-3" /> {product.data}
                        </Badge>
                        
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {product.day} días
                        </Badge>
                        
                        {product.voice !== undefined && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Smartphone className="h-3 w-3" /> {product.voice} min
                          </Badge>
                        )}
                        
                        {product.text !== undefined && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Smartphone className="h-3 w-3" /> {product.text} SMS
                          </Badge>
                        )}
                      </div>
                      
                      <Tabs defaultValue="coverage" className="mt-3">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="coverage">Cobertura</TabsTrigger>
                          <TabsTrigger value="details">Detalles</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="coverage" className="pt-3">
                          <div className="flex flex-wrap gap-1 mt-2 max-h-20 overflow-y-auto">
                            {product.countries.map(country => (
                              <Badge key={country.id} variant="secondary" className="text-xs">
                                {country.name}
                              </Badge>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="details" className="pt-3">
                          <div className="text-sm">
                            {product.short_info && (
                              <p>{product.short_info}</p>
                            )}
                            <dl className="mt-2 grid grid-cols-2 gap-1 text-xs">
                              <dt className="text-muted-foreground">ID:</dt>
                              <dd>{product.package_id}</dd>
                              <dt className="text-muted-foreground">Tipo:</dt>
                              <dd>{product.type}</dd>
                              {product.is_prepaid !== undefined && (
                                <>
                                  <dt className="text-muted-foreground">Prepago:</dt>
                                  <dd>{product.is_prepaid ? 'Sí' : 'No'}</dd>
                                </>
                              )}
                              {product.is_roaming !== undefined && (
                                <>
                                  <dt className="text-muted-foreground">Roaming:</dt>
                                  <dd>{product.is_roaming ? 'Sí' : 'No'}</dd>
                                </>
                              )}
                            </dl>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t">
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
                
                {/* Pagination */}
                {!isLoading && filteredProducts.length > 0 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {/* Show current page and total */}
                      <PaginationItem>
                        <PaginationLink isActive>
                          {currentPage} / {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev)}
                          className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
