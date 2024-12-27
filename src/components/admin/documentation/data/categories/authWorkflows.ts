import { WorkflowItem } from "../../types/WorkflowTypes"

export const authWorkflows: WorkflowItem[] = [
  {
    id: "FL-001",
    title: "Registro automático de cliente",
    description: "Proceso de registro automático al completar una compra y sistema de magic links",
    status: "pending",
    components: [
      "components/auth/MagicLinkForm.tsx",
      "components/checkout/CheckoutForm.tsx",
      "contexts/AuthContext.tsx",
      "hooks/useAuth.tsx"
    ],
    database: [
      "auth.users (tabla Supabase)",
      "public.profiles (tabla personalizada)",
      "public.role_permissions (tabla personalizada)"
    ],
    details: `
Flujo de registro automático:
1. Usuario completa compra solo con email
2. Sistema crea cuenta automáticamente
3. Se envía email con magic link
4. Usuario puede acceder en cualquier momento vía magic link

Políticas RLS necesarias:
- Perfiles: lectura pública, escritura sistema
- Role_permissions: lectura autenticada, escritura admin
    `
  },
  {
    id: "FL-002",
    title: "Acceso con Magic Link",
    description: "Sistema de autenticación sin contraseña usando magic links",
    status: "pending",
    components: [
      "components/auth/MagicLinkForm.tsx",
      "components/auth/RoleBasedLayout.tsx",
      "contexts/AuthContext.tsx",
      "hooks/useAuth.tsx",
      "components/auth/ProtectedRoute.tsx"
    ],
    database: [
      "auth.users (tabla Supabase)",
      "public.profiles (tabla personalizada)",
      "public.role_permissions (tabla personalizada)"
    ],
    details: `
Estructura de roles y permisos:

1. Cliente:
   - Acceso solo por magic link
   - Ver pedidos propios
   - Crear tickets de soporte
   - No requiere contraseña

2. Manager (creado por admin en Supabase):
   - Gestión de envíos asignados
   - Ver pedidos en su área (físicos o eSIM)
   - Actualizar estados de envío
   - Acceso a documentación básica

3. Admin (creado manualmente en Supabase):
   - Gestión completa de usuarios
   - Asignación de roles
   - Gestión de productos
   - Acceso a métricas y reportes
   - Configuración del sistema

Políticas RLS necesarias:
- Pedidos: filtrar por rol y propiedad
- Envíos: filtrar por tipo y asignación
- Productos: lectura pública, escritura admin
    `
  },
  {
    id: "FL-003",
    title: "Gestión de permisos",
    description: "Sistema de control y asignación de permisos por rol",
    status: "pending",
    components: [
      "components/admin/RoleManager.tsx",
      "components/admin/PermissionMatrix.tsx",
      "hooks/useRolePermissions.tsx"
    ],
    database: [
      "public.role_permissions (tabla personalizada)",
      "public.permission_logs (tabla de auditoría)"
    ],
    details: `
Estructura de permisos:

1. Niveles de acceso:
   - read: solo lectura
   - write: lectura y escritura
   - admin: control total
   - none: sin acceso

2. Áreas de permisos:
   - orders: pedidos
   - products: productos
   - users: usuarios
   - shipping: envíos
   - reports: reportes
   - settings: configuración

Políticas RLS:
- Solo admin puede modificar permisos
- Logs de cambios de permisos
- Verificación en tiempo real de permisos
    `
  }
]