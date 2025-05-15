
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { Calendar, FileBarChart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export function AiraloReports() {
  const [period, setPeriod] = useState("month")

  // Datos simulados para gráficos - adaptados para nuestro componente Chart
  const salesData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ventas de eSIM',
        data: [12, 19, 3, 5, 2, 3, 20, 33, 18, 11, 18, 25],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  }

  // Transformar los datos para que funcionen con nuestro componente recharts
  const transformedSalesData = salesData.labels.map((month, index) => ({
    name: month,
    'Ventas de eSIM': salesData.datasets[0].data[index],
  }))
  
  const regionsData = [
    { name: 'Europa', value: 35 },
    { name: 'América del Norte', value: 25 },
    { name: 'Asia', value: 22 },
    { name: 'Oceanía', value: 8 },
    { name: 'América del Sur', value: 7 },
    { name: 'África', value: 3 }
  ]

  const revenueChartData = salesData.labels.map((month, index) => ({
    name: month,
    'Ingresos (EUR)': [500, 800, 200, 350, 150, 250, 1000, 1500, 900, 600, 850, 1200][index],
  }))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="h-5 w-5" />
              Informes de Airalo
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Semanal</SelectItem>
                  <SelectItem value="month">Mensual</SelectItem>
                  <SelectItem value="quarter">Trimestral</SelectItem>
                  <SelectItem value="year">Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription>
            Visualiza estadísticas y tendencias de tus ventas de eSIM a través de Airalo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sales">
            <TabsList className="mb-4">
              <TabsTrigger value="sales">Ventas</TabsTrigger>
              <TabsTrigger value="regions">Regiones</TabsTrigger>
              <TabsTrigger value="revenue">Ingresos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sales" className="space-y-4">
              <div className="h-[350px]">
                <BarChart 
                  data={transformedSalesData}
                  options={{
                    datasets: [
                      {
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)'
                      }
                    ]
                  }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Total eSIMs vendidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">169</div>
                    <div className="text-xs text-muted-foreground">+12% respecto al periodo anterior</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">eSIMs activas actualmente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">87</div>
                    <div className="text-xs text-muted-foreground">51% de tasa de activación</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Producto más vendido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">Europa Unlimited</div>
                    <div className="text-xs text-muted-foreground">35% del total de ventas</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="regions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[400px]">
                  <PieChart 
                    data={regionsData}
                    options={{
                      datasets: [
                        {
                          backgroundColor: [
                            '#36a2eb',
                            '#ff6384',
                            '#4bc0c0',
                            '#ffcd56',
                            '#9966ff',
                            '#ff9f40'
                          ],
                        }
                      ]
                    }}
                  />
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Regiones principales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Europa</div>
                        <div className="text-sm">35% (59 ventas)</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="font-medium">América del Norte</div>
                        <div className="text-sm">25% (42 ventas)</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-400 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="font-medium">Asia</div>
                        <div className="text-sm">22% (37 ventas)</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Países destacados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>España</span>
                          <span className="font-medium">18 ventas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estados Unidos</span>
                          <span className="font-medium">15 ventas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Italia</span>
                          <span className="font-medium">12 ventas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Japón</span>
                          <span className="font-medium">11 ventas</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Francia</span>
                          <span className="font-medium">9 ventas</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="revenue">
              <div className="h-[400px]">
                <LineChart 
                  data={revenueChartData}
                  options={{
                    datasets: [
                      {
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgb(54, 162, 235)',
                      }
                    ]
                  }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Ingresos totales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8.300 €</div>
                    <div className="text-xs text-muted-foreground">+24% respecto al periodo anterior</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Ingreso medio por cliente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">49,11 €</div>
                    <div className="text-xs text-muted-foreground">+3,5% respecto al periodo anterior</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Producto más rentable</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">Europa Unlimited</div>
                    <div className="text-xs text-muted-foreground">3.270 € en ventas totales</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
