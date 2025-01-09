import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthErrorProps {
  message: string
}

export function AuthError({ message }: AuthErrorProps) {
  if (!message) return null
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}