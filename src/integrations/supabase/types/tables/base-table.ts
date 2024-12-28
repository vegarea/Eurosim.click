import type { Json } from '../base'

export interface TableDefaults {
  Row: Record<string, unknown>
  Insert: Record<string, unknown>
  Update: Record<string, unknown>
  Relationships: Array<{
    foreignKeyName: string
    columns: string[]
    isOneToOne: boolean
    referencedRelation: string
    referencedColumns: string[]
  }>
}