
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AiraloApiConfig } from "@/types/airalo"
import { Globe, KeyRound, ShieldCheck, CheckCircle2, XCircle } from "lucide-react"

export function AiraloConfig() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const [formState, setFormState] = useState<AiraloApiConfig>({
    api_key: "",
    api_secret: "",
    api_url: "https://api.airalo.com/v2",
    is_active: false
  })
  
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")

  // Cargar configuración existente
  const { data: config, isLoading } = useQuery({
    queryKey: ['airalo-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('airalo_settings')
        .select('*')
        .maybeSingle()
      
      if (error) throw error
      
      if (data) {
        setFormState({
          api_key: data.api_key || "",
          api_secret: data.api_secret || "",
          api_url: data.api_url || "https://api.airalo.com/v2",
          is_active: data.is_active || false
        })
        return data
      }
      
      return null
    }
  })

  // Guardar configuración
  const saveConfigMutation = useMutation({
    mutationFn: async (config: AiraloApiConfig) => {
      const { data, error } = await supabase
        .from('airalo_settings')
        .upsert({
          id: "airalo-config",
          api_key: config.api_key,
          api_secret: config.api_secret,
          api_url: config.api_url,
          is_active: config.is_active
        })
        .select()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airalo-config'] })
      toast({
        title: "Configuración guardada",
        description: "La configuración de Airalo se ha guardado correctamente.",
      })
    },
    onError: (error) => {
      toast({
        title: "Error al guardar",
        description: `Ha ocurrido un error: ${error.message}`,
        variant: "destructive",
      })
    }
  })

  // Probar conexión
  const testConnection = async () => {
    setIsTestingConnection(true)
    setConnectionStatus("idle")
    
    try {
      const response = await fetch('/api/test-airalo-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: formState.api_key,
          apiSecret: formState.api_secret,
          apiUrl: formState.api_url,
        }),
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setConnectionStatus("success")
        toast({
          title: "Conexión exitosa",
          description: "La conexión con Airalo se ha establecido correctamente.",
        })
      } else {
        setConnectionStatus("error")
        toast({
          title: "Error de conexión",
          description: result.error || "No se pudo conectar con Airalo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setConnectionStatus("error")
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con Airalo.",
        variant: "destructive",
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  const handleSave = () => {
    saveConfigMutation.mutate(formState)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Configuración de la API de Airalo
        </CardTitle>
        <CardDescription>
          Configura las credenciales de la API de Airalo para poder conectarte a sus servicios
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input 
              id="apiKey" 
              value={formState.api_key} 
              onChange={e => setFormState({...formState, api_key: e.target.value})}
              placeholder="Ingresa tu API Key de Airalo"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiSecret">API Secret</Label>
            <Input 
              id="apiSecret" 
              type="password"
              value={formState.api_secret} 
              onChange={e => setFormState({...formState, api_secret: e.target.value})}
              placeholder="Ingresa tu API Secret de Airalo"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiUrl">URL de la API</Label>
            <Input 
              id="apiUrl" 
              value={formState.api_url} 
              onChange={e => setFormState({...formState, api_url: e.target.value})}
              placeholder="URL de la API de Airalo"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="isActive" 
              checked={formState.is_active} 
              onCheckedChange={checked => setFormState({...formState, is_active: checked})}
            />
            <Label htmlFor="isActive">Activar integración con Airalo</Label>
          </div>
        </div>
        
        {connectionStatus === "success" && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Conexión exitosa con Airalo</span>
          </div>
        )}
        
        {connectionStatus === "error" && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            <span>Error al conectar con Airalo. Verifica tus credenciales.</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={testConnection} 
          disabled={isTestingConnection || !formState.api_key || !formState.api_secret}
        >
          <Globe className="mr-2 h-4 w-4" />
          Probar conexión
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={saveConfigMutation.isPending}
        >
          <ShieldCheck className="mr-2 h-4 w-4" />
          Guardar configuración
        </Button>
      </CardFooter>
    </Card>
  )
}
