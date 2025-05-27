import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAiraloClient } from "@/hooks/useAiraloClient"
import { supabase } from "@/integrations/supabase/client"
import { Database } from "@/integrations/supabase/generated-types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WebhookTester } from "./WebhookTester"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

type AiraloSettings = Database['public']['Tables']['airalo_settings']['Row']

export function AiraloConfig() {
  const { toast } = useToast()
  const { checkConnection } = useAiraloClient()
  const [settings, setSettings] = useState<AiraloSettings | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testingConnection, setTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState('general')

  const { register, handleSubmit, setValue, watch } = useForm<AiraloSettings>({
    defaultValues: {
      id: 'airalo',
      is_active: false,
      api_key: '',
      api_secret: '',
      api_url: 'https://sandbox-partners-api.airalo.com/v2',
      webhook_url: null
    }
  })

  // Watch form values
  const apiUrl = watch('api_url')
  const isActive = watch('is_active')

  // Load settings from Supabase
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('airalo_settings')
          .select('*')
          .maybeSingle()

        if (error) {
          console.error('Error fetching Airalo settings:', error)
          toast({
            title: 'Error',
            description: 'No se pudieron cargar los ajustes de Airalo',
            variant: 'destructive',
          })
        } else if (data) {
          const typedData = data as AiraloSettings
          setSettings(typedData)
          
          // Populate form with data
          setValue('id', typedData.id || 'airalo')
          setValue('is_active', typedData.is_active || false)
          setValue('api_key', typedData.api_key || '')
          setValue('api_secret', typedData.api_secret || '')
          setValue('api_url', typedData.api_url || 'https://sandbox-partners-api.airalo.com/v2')
          setValue('webhook_url', typedData.webhook_url || null)
        }
      } catch (error) {
        console.error('Unexpected error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [setValue, toast])

  // Handle form submission
  const onSubmit = async (data: AiraloSettings) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('airalo_settings')
        .upsert([data], { onConflict: 'id' })

      if (error) {
        console.error('Error saving Airalo settings:', error)
        toast({
          title: 'Error',
          description: 'No se pudieron guardar los ajustes de Airalo',
          variant: 'destructive',
        })
      } else {
        setSettings(data)
        toast({
          title: 'Éxito',
          description: 'Configuración de Airalo guardada correctamente',
        })
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Test API connection
  const testConnection = async () => {
    setTestingConnection(true)
    setConnectionStatus('idle')
    
    try {
      const success = await checkConnection()
      
      if (success) {
        setConnectionStatus('success')
        toast({
          title: 'Conexión exitosa',
          description: 'La conexión con la API de Airalo es correcta',
        })
      } else {
        setConnectionStatus('error')
        toast({
          title: 'Error de conexión',
          description: 'No se pudo conectar con la API de Airalo. Verifica tus credenciales.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      setConnectionStatus('error')
      console.error('Connection test error:', error)
      toast({
        title: 'Error de conexión',
        description: 'Ocurrió un error al intentar conectar con la API de Airalo',
        variant: 'destructive',
      })
    } finally {
      setTestingConnection(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Airalo</CardTitle>
          <CardDescription>
            Configura las credenciales para integrar con la API de Airalo para eSIMs internacionales.
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <CardContent>
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="is-active" {...register('is_active')} defaultChecked={settings?.is_active} />
                  <Label htmlFor="is-active">Activar integración con Airalo</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api_url">URL de la API</Label>
                  <Input 
                    id="api_url" 
                    {...register('api_url')} 
                    defaultValue={settings?.api_url || 'https://sandbox-partners-api.airalo.com/v2'}
                  />
                  <p className="text-sm text-muted-foreground">
                    {apiUrl.includes('sandbox') ? 
                      'Usando entorno de pruebas (sandbox)' : 
                      '⚠️ Usando entorno de producción'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api_key">API Key</Label>
                  <Input 
                    id="api_key" 
                    type="password" 
                    {...register('api_key')}
                    defaultValue={settings?.api_key}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api_secret">API Secret</Label>
                  <Input 
                    id="api_secret" 
                    type="password" 
                    {...register('api_secret')}
                    defaultValue={settings?.api_secret}
                  />
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={testConnection}
                    disabled={testingConnection || !isActive}
                  >
                    {testingConnection ? 'Probando...' : 'Probar conexión'}
                  </Button>
                  
                  {connectionStatus === 'success' && (
                    <div className="flex items-center text-green-500">
                      <CheckCircle2 className="w-5 h-5 mr-1" />
                      <span>Conexión exitosa</span>
                    </div>
                  )}
                  
                  {connectionStatus === 'error' && (
                    <div className="flex items-center text-destructive">
                      <AlertTriangle className="w-5 h-5 mr-1" />
                      <span>Error de conexión</span>
                    </div>
                  )}
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar configuración'}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="webhooks">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="webhook_url">URL del Webhook</Label>
                    <Input 
                      id="webhook_url" 
                      {...register('webhook_url')}
                      defaultValue={settings?.webhook_url || ''}
                      placeholder="https://tu-dominio.com/api/airalo-webhook"
                    />
                    <p className="text-sm text-muted-foreground">
                      Esta URL recibirá las notificaciones de Airalo cuando ocurran eventos como baja disponibilidad de datos o expiración próxima.
                    </p>
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={handleSubmit(onSubmit)} 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Guardando...' : 'Guardar URL de Webhook'}
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <WebhookTester />
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}
