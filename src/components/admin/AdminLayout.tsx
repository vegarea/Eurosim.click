import { useEffect, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "./AdminSidebar"
import { supabase } from "@/integrations/supabase/client"
import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Error checking session:', sessionError)
          navigate('/login')
          return
        }

        if (!session) {
          console.log('No active session found')
          navigate('/login')
          return
        }

        setUser(session.user)
      } catch (error) {
        console.error('Error in session check:', error)
        navigate('/login')
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)
      
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        setUser(null)
        navigate('/login')
        return
      }

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profile?.role !== 'admin') {
          console.log('User is not an admin')
          await supabase.auth.signOut()
          navigate('/login')
          toast.error('No tienes permisos de administrador')
          return
        }

        setUser(session.user)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/login')
      toast.success('Sesión cerrada correctamente')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      toast.error('Error al cerrar sesión')
    }
  }

  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-brand-50/50 to-white">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="bg-white border-b px-4 py-2 flex justify-end items-center gap-4 text-sm text-gray-600">
            <span>Sesión activa:</span>
            <span className="font-medium text-brand-600">{user.email}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
          <div className="container mx-auto py-8 px-4 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}