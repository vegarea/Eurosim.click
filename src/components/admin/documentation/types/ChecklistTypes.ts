export type ChecklistItemStatus = "pending" | "in_progress" | "completed" | "reviewed"

export interface TypeDefinition {
  name: string
  path: string
  code: string
}

export interface ChecklistItem {
  name: string
  status: ChecklistItemStatus
  description: string
  locations?: string[]
  currentTypes?: TypeDefinition[]
  supabaseTypes?: TypeDefinition[]
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