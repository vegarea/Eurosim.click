import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { testEmailService } from "@/services/emailService"
import { useToast } from "@/components/ui/use-toast"

export function ApiKeySetup() {
  const [testEmail, setTestEmail] = useState("")
  const [isTesting, setIsTesting] = useState(false)
  const { toast } = useToast()

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast({
        title: "Error",
        description: "Por favor ingresa un email para la prueba",
        variant: "destructive"
      })
      return
    }

    setIsTesting(true)
    try {
      await testEmailService(testEmail)
      toast({
        title: "¡Éxito!",
        description: "El email de prueba ha sido enviado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el email de prueba. Por favor verifica la configuración.",
        variant: "destructive"
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Configuración de Email</h3>
        <p className="text-sm text-muted-foreground">
          Prueba la configuración de email enviando un mensaje de prueba
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Email para prueba"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
        />
        <Button 
          onClick={handleTestEmail}
          disabled={isTesting}
        >
          {isTesting ? "Enviando..." : "Enviar prueba"}
        </Button>
      </div>
    </div>
  )
}