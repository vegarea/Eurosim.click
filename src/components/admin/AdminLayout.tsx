import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "./AdminSidebar"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-8 px-4 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}