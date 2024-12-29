export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface OrderEvent {
  id: string;
  type: string;
  description: string;
  user_id?: string;
  user_name?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface OrderNote {
  id: string;
  text: string;
  user_id: string;
  user_name: string;
  created_at: string;
}