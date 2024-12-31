export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface OrderItemMetadata {
  product_title?: string;
  product_description?: string;
  product_type?: string;
  [key: string]: any;
}