export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface OrderItemMetadata {
  product_title?: string;
  product_description?: string;
  product_type?: string;
  [key: string]: any;
}

export interface OrderEvent {
  id: string;
  type: "created" | "status_changed" | "payment_processed" | "shipping_updated" | "note_added" | "document_validated";
  description: string;
  user_id?: string;
  metadata?: {
    automated?: boolean;
    oldStatus?: string;
    newStatus?: string;
    trackingNumber?: string;
    carrier?: string;
    [key: string]: any;
  };
  created_at: string;
}