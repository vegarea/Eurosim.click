import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { setBrevoApiKey, validateApiKey } from "@/services/emailService"
import { useToast } from "@/components/ui/use-toast"

export function ApiKeySetup() {
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const isValid = await validateApiKey(apiKey)
      
      if (isValid) {
        setBrevoApiKey(apiKey)
        toast({
          title: "API Key guardada",
          description: "La API key de Brevo ha sido validada y guardada correctamente"
        })
      } else {
        toast({
          title: "API Key inválida",
          description: "La API key proporcionada no es válida",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo validar la API key",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="apiKey">Brevo API Key</Label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Ingresa tu API key de Brevo"
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Validando..." : "Guardar API Key"}
      </Button>
    </form>
  )
}