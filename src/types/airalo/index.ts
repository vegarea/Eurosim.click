
// Tipos para la configuración de la API de Airalo
export interface AiraloApiConfig {
  id?: string;
  api_key: string;
  api_secret: string;
  api_url: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Tipos para productos de Airalo
export interface AiraloProduct {
  id: string;
  airalo_product_id: string;
  local_product_id?: string;
  name: string;
  description?: string;
  countries: string[];
  validity_days: number;
  data_amount: number; // En MB
  price: number; // En centavos
  currency: string;
  is_popular?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Tipos para pedidos de Airalo
export interface AiraloOrder {
  id: string;
  order_id?: string;
  airalo_order_id?: string;
  customer_id?: string;
  product_id: string;
  status: 'pending' | 'processed' | 'activated' | 'failed';
  ordered_at: string;
  activation_code?: string;
  qr_code?: string;
  activation_date?: string;
  expires_at?: string;
  price: number;
  currency: string;
  metadata?: Record<string, any>;
}

// Estado del contexto de Airalo
export interface AiraloState {
  config: AiraloApiConfig | null;
  isConfigured: boolean;
  isLoading: boolean;
  error: string | null;
  products: AiraloProduct[];
  orders: AiraloOrder[];
}
