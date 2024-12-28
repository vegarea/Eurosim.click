import { Button } from "@/components/ui/button"
import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function StripeConnectionTest() {
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('test-stripe-connection')
      
      if (error) throw error
      
      if (data.success) {
        toast.success('Conexión con Stripe exitosa', {
          description: `Se encontraron ${data.productCount} productos`
        })
      } else {
        throw new Error(data.message || 'Error desconocido')
      }
    } catch (error) {
      console.error('Error testing Stripe connection:', error)
      toast.error('Error al probar la conexión con Stripe', {
        description: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4">
      <Button 
        onClick={testConnection}
        disabled={isLoading}
      >
        {isLoading ? 'Probando conexión...' : 'Probar conexión con Stripe'}
      </Button>
    </div>
  )
}