import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { RoleCard } from "./RoleCard"

interface AssistantRole {
  id: string
  role: 'sales' | 'support' | 'compatibility_checker' | 'blog_writer'
  name: string
  description: string | null
  system_prompt: string
  is_active: boolean
}

export function RolesList() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [roles, setRoles] = useState<AssistantRole[]>([])

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('ai_assistant_roles')
        .select('*')
        .order('role')

      if (error) throw error
      
      if (data) {
        setRoles(data)
      }
    } catch (error) {
      console.error('Error loading roles:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los roles del asistente",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateRole = async (roleId: string, updates: Partial<AssistantRole>) => {
    try {
      const { data, error } = await supabase
        .from('ai_assistant_roles')
        .update(updates)
        .eq('id', roleId)
        .select()
        .single()

      if (error) throw error

      // Actualizar estado local solo si la actualización fue exitosa
      setRoles(roles.map(role => 
        role.id === roleId ? { ...role, ...updates } : role
      ))

      return Promise.resolve()
    } catch (error) {
      console.error('Error updating role:', error)
      toast({
        title: "Error al actualizar",
        description: "No se pudieron guardar los cambios. Por favor intenta de nuevo.",
        variant: "destructive"
      })
      throw error
    }
  }

  if (isLoading) {
    return <div>Cargando roles...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Roles del Asistente</h2>
      </div>

      {roles.map((role) => (
        <RoleCard 
          key={role.id} 
          role={role} 
          onUpdate={handleUpdateRole}
        />
      ))}
    </div>
  )
}