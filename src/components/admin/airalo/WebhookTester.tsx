
import { useState } from "react"
import { useAiraloClient } from "@/hooks/useAiraloClient"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle } from "lucide-react"
import { AiraloWebhookSimulationRequest } from "@/types/airalo/api-types"

export function WebhookTester() {
  const { simulateWebhook, isLoading, error } = useAiraloClient()
  const { toast } = useToast()
  const [formData, setFormData] = useState<AiraloWebhookSimulationRequest>({
    event: 'low_data_notification',
    type: 'data_80',
    iccid: ''
  })
  
  const handleChange = (field: keyof AiraloWebhookSimulationRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if ICCID is provided when it's empty but not required
    if (!formData.iccid) {
      toast({
        title: "¿Continuar sin ICCID?",
        description: "No has proporcionado un ICCID. Se usará uno aleatorio. ¿Deseas continuar?",
        action: (
          <Button 
            variant="outline" 
            onClick={async () => {
              const success = await simulateWebhook(formData)
              showResultToast(success)
            }}
          >
            Continuar
          </Button>
        ),
      })
      return
    }
    
    // If ICCID is provided or user confirms to proceed without
    const success = await simulateWebhook(formData)
    showResultToast(success)
  }
  
  const showResultToast = (success: boolean) => {
    if (success) {
      toast({
        title: "Webhook simulado correctamente",
        description: "La notificación ha sido enviada al endpoint configurado.",
        variant: "default",
      })
    } else {
      toast({
        title: "Error al simular webhook",
        description: error || "No se pudo enviar la notificación al endpoint configurado.",
        variant: "destructive",
      })
    }
  }

  const getAvailableTypes = () => {
    switch (formData.event) {
      case 'low_data_notification':
        return [
          { value: 'data_20', label: 'Dato 20% consumido' },
          { value: 'data_50', label: 'Dato 50% consumido' },
          { value: 'data_80', label: 'Dato 80% consumido' }
        ];
      case 'expiration_notification':
        return [
          { value: 'expire_1', label: '1 día para expirar' },
          { value: 'expire_3', label: '3 días para expirar' },
          { value: 'expire_7', label: '7 días para expirar' }
        ];
      default:
        return [];
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulador de Webhooks</CardTitle>
        <CardDescription>
          Usa esta herramienta para probar las notificaciones de webhook de Airalo.
          Se enviará una notificación de prueba al endpoint configurado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event">Tipo de Evento</Label>
            <Select 
              value={formData.event} 
              onValueChange={(value) => {
                handleChange('event', value as any)
                // Reset type when event changes to get appropriate type options
                const newTypes = value === 'low_data_notification' ? 'data_80' : 'expire_1'
                handleChange('type', newTypes)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low_data_notification">Notificación de Bajo Consumo de Datos</SelectItem>
                <SelectItem value="expiration_notification">Notificación de Expiración</SelectItem>
                <SelectItem value="order_activated">Activación de Pedido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {formData.event !== 'order_activated' && (
            <div className="space-y-2">
              <Label htmlFor="type">Subtipo de Notificación</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un subtipo" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableTypes().map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="iccid">ICCID (opcional)</Label>
            <Input
              id="iccid"
              placeholder="Introduce el ICCID (opcional)"
              value={formData.iccid || ''}
              onChange={(e) => handleChange('iccid', e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Si no se proporciona, se utilizará un ICCID aleatorio.
            </p>
          </div>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Simular Webhook'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
