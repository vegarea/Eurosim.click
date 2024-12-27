import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { setBrevoApiKey } from "@/services/emailService"
import { useToast } from "@/components/ui/use-toast"

export function ApiKeySetup() {
  const [apiKey, setApiKey] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setBrevoApiKey(apiKey)
      toast({
        title: "API Key guardada",
        description: "La API key de Brevo ha sido guardada correctamente"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la API key",
        variant: "destructive"
      })
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
        />
      </div>
      <Button type="submit">Guardar API Key</Button>
    </form>
  )
}