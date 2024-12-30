import { Json } from "./common"
import { ProductType } from "./enums"

export interface OrderItemMetadata {
  product_title: string
  product_type: ProductType
  data_eu_gb: number
  data_es_gb: number
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  metadata: OrderItemMetadata | null
  created_at: string
  updated_at: string
}