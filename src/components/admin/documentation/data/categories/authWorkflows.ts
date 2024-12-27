import { WorkflowItem } from "../../types/WorkflowTypes"

export const authWorkflows: WorkflowItem[] = [
  {
    id: "FL-001",
    title: "Registro de usuario",
    description: "Proceso de registro de nuevos usuarios en la plataforma",
    status: "pending",
    components: [
      "RegisterForm.tsx",
      "AuthContext.tsx"
    ],
    database: [
      "users (tabla)",
      "profiles (tabla)"
    ],
    details: "Pendiente implementar validación de email y proceso de verificación"
  },
  {
    id: "FL-002",
    title: "Inicio de sesión",
    description: "Sistema de autenticación de usuarios",
    status: "pending",
    components: [
      "LoginForm.tsx",
      "AuthContext.tsx"
    ],
    database: [
      "users (tabla)",
      "sessions (tabla)"
    ]
  }
]