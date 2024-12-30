/**
 * @lovable-protected
 * This file contains types that match Supabase schema exactly.
 * DO NOT MODIFY without explicit user permission.
 */
import { ProductStatus, ProductType } from "./enums";
import { Json } from "./common";

export interface Product {
  id: string;
  title: string;
  description: string | null;
  type: ProductType;
  price: number;
  status: ProductStatus;
  stock: number | null;
  data_eu_gb: number;
  data_es_gb: number;
  validity_days: number;
  features: Json | null;
  metadata: Json | null;
  created_at: string | null;
  updated_at: string | null;
}

export type ProductInsert = Omit<Product, "id" | "created_at" | "updated_at">;
export type ProductUpdate = Partial<ProductInsert>;