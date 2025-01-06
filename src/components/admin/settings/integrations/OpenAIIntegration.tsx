import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"

interface OpenAIIntegrationProps {
  onSave: () => void
}

export function OpenAIIntegration({ onSave }: OpenAIIntegrationProps) {
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    try {
      setIsLoading(true)
      
      // Verificar que la API key tenga el formato correcto
      if (!apiKey.startsWith('sk-')) {
        throw new Error('La API key debe comenzar con "sk-"')
      }

      const { error } = await supabase.functions.invoke('update-openai-key', {
        body: { apiKey }
      })

      if (error) throw error

      setApiKey("")
      onSave()
    } catch (error) {
      console.error('Error saving OpenAI key:', error)
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