import type { Json } from '../base'
import type { TableDefaults } from './base-table'

export interface ProductsTable extends TableDefaults {
  Row: {
    created_at: string | null
    description: string
    europe_gb: number | null
    features: string[]
    id: string
    metadata: Json | null
    price: number
    spain_gb: number | null
    status: string
    stock: number | null
    title: string
    type: string
    updated_at: string | null
  }
  Insert: {
    created_at?: string | null
    description: string
    europe_gb?: number | null
    features?: string[]
    id?: string
    metadata?: Json | null
    price: number
    spain_gb?: number | null
    status?: string
    stock?: number | null
    title: string
    type: string
    updated_at?: string | null
  }
  Update: {
    created_at?: string | null
    description?: string
    europe_gb?: number | null
    features?: string[]
    id?: string
    metadata?: Json | null
    price?: number
    spain_gb?: number | null
    status?: string
    stock?: number | null
    title?: string
    type?: string
    updated_at?: string | null
  }
  Relationships: []
}