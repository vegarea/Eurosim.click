export type ChecklistItemStatus = "pending" | "in_progress" | "completed" | "reviewed"

export interface ChecklistItem {
  id: string
  category: string
  items: Array<{
    name: string
    status: ChecklistItemStatus
    description: string
  }>
}