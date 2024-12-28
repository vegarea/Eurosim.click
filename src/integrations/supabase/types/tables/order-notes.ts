import type { Json } from '../base'
import type { TableDefaults } from './base-table'

export interface OrderNotesTable extends TableDefaults {
  Row: {
    created_at: string | null
    id: string
    order_id: string
    text: string
    user_id: string
  }
  Insert: {
    created_at?: string | null
    id?: string
    order_id: string
    text: string
    user_id: string
  }
  Update: {
    created_at?: string | null
    id?: string
    order_id?: string
    text?: string
    user_id?: string
  }
  Relationships: [
    {
      foreignKeyName: "order_notes_order_id_fkey"
      columns: ["order_id"]
      isOneToOne: false
      referencedRelation: "orders"
      referencedColumns: ["id"]
    }
  ]
}