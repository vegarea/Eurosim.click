/**
 * @lovable-protected
 * This file contains types that match Supabase schema exactly.
 * DO NOT MODIFY without explicit user permission.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface OrderEvent {
  type: string;
  timestamp: string;
  details?: Record<string, any>;
}