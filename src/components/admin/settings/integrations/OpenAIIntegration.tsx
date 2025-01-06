import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"

interface OpenAIIntegrationProps {
  onSave: () => void
}

export function OpenAIIntegration({ onSave }: OpenAIIntegrationProps) {
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      setIsLoading(true)
      
      // Verificar que la API key tenga el formato correcto
      if (!apiKey.startsWith('sk-')) {
        toast({
          title: "Error",
          description: 'La API key debe comenzar con "sk-"',
          variant: "destructive"
        })
        return
      }

      const { error } = await supabase.functions.invoke('update-openai-key', {
        body: { apiKey }
      })

      if (error) throw error

      toast({
        title: "API Key guardada",
        description: "La API key de OpenAI ha sido guardada correctamente"
      })
      
      setApiKey("")
      onSave()
    } catch (error) {
      console.error('Error saving OpenAI key:', error)
      toast({
        title: "Error",
        description: "No se pudo guardar la API key",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenAI</CardTitle>
        <CardDescription>
          Configura tu API key de OpenAI para habilitar el asistente virtual y otras funcionalidades de IA
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai-key">API Key</Label>
          <Input
            id="openai-key"
            type="password"
            placeholder="sk-..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <Button onClick={handleSave} disabled={!apiKey || isLoading}>
          {isLoading ? "Guardando..." : "Guardar API Key"}
        </Button>
      </CardContent>
    </Card>
  )
}