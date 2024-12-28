export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: CustomersTable
      order_events: OrderEventsTable
      order_notes: OrderNotesTable
      orders: OrdersTable
      payments: PaymentsTable
      products: ProductsTable
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type PublicSchema = Database[Extract<keyof Database, "public">]