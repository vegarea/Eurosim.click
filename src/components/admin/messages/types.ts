
// Definir el tipo para mensajes de contacto
export type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  status: string
  created_at: string
  response?: string
  responded_at?: string
  is_archived: boolean
}
