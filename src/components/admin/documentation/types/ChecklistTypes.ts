export type ChecklistItemStatus = "pending" | "reviewed" | "completed"

export interface TypeDefinition {
  name: string
  path: string
  code: string
}

export interface TypeDependency {
  name: string
  path: string
}

export interface ChecklistItem {
  name: string
  status: ChecklistItemStatus
  description: string
  category: "component" | "form" | "context" | "hook"
  locations: string[]
  dependencies?: TypeDependency[]
  currentTypes: TypeDefinition[]
  supabaseTypes: TypeDefinition[]
}

export interface ChecklistCategory {
  id: string
  category: string
  items: ChecklistItem[]
}

export interface TypeUpdateResult {
  success: boolean
  updatedType?: string
  error?: string
}