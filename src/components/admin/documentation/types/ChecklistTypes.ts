export type ChecklistItemStatus = "pending" | "in_progress" | "completed" | "reviewed" | "updated"

export interface TypeDefinition {
  name: string
  path: string
  code: string
}

export interface TypeRelation {
  type: "one_to_one" | "one_to_many" | "many_to_one" | "many_to_many"
  with: string
  through?: string
  description?: string
}

export interface ChecklistItem {
  name: string
  status: ChecklistItemStatus
  description: string
  locations?: string[]
  currentTypes?: TypeDefinition[]
  supabaseTypes?: TypeDefinition[]
  relations?: TypeRelation[]
  requiredFields?: string[]
  category: "component" | "form" | "context" | "hook" | "util"
  currentType: string
  supabaseType: string
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