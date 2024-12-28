import { Database, Lock, Server } from "lucide-react"
import { TypeComparisonSection } from "../components/TypeComparisonSection"

export function SystemTypes() {
  return (
    <div className="space-y-6">
      <TypeComparisonSection
        title="Base de Datos"
        icon={<Database className="h-5 w-5" />}
        currentType={`// Tipos actuales en el sistema`}
        supabaseType={`// Tipos requeridos por Supabase`}
        status="pending"
        relatedFiles={[
          "docs/database/schema.ts",
          "src/types/database.ts"
        ]}
      />

      <TypeComparisonSection
        title="Autenticación"
        icon={<Lock className="h-5 w-5" />}
        currentType={`type User = {
  id: string
  email: string
}`}
        supabaseType={`type User = {
  id: uuid
  email: text
  created_at: timestamp
}`}
        status="pending"
        relatedFiles={[
          "src/components/auth/types.ts",
          "src/contexts/AuthContext.tsx"
        ]}
      />

      <TypeComparisonSection
        title="Almacenamiento"
        icon={<Server className="h-5 w-5" />}
        currentType={`type StorageFile = {
  path: string
  type: string
}`}
        supabaseType={`type StorageFile = {
  id: uuid
  path: text
  type: text
  created_at: timestamp
}`}
        status="pending"
        relatedFiles={[
          "src/services/storage.ts",
          "src/types/storage.ts"
        ]}
      />
    </div>
  )
}