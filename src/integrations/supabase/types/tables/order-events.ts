import type { Json } from '../base'
import type { TableDefaults } from './base-table'

export interface OrderEventsTable extends TableDefaults {
  Row: {
    created_at: string | null
    description: string
    id: string
    metadata: Json | null
    order_id: string
    type: string
    user_id: string | null
  }
  Insert: {
    created_at?: string | null
    description: string
    id?: string
    metadata?: Json | null
    order_id: string
    type: string
    user_id?: string | null
  }
  Update: {
    created_at?: string | null
    description?: string
    id?: string
    metadata?: Json | null
    order_id?: string
    type?: string
    user_id?: string | null
  }
  Relationships: [
    {
      foreignKeyName: "order_events_order_id_fkey"
      columns: ["order_id"]
      isOneToOne: false
      referencedRelation: "orders"
      referencedColumns: ["id"]
    }
  ]
}