
// Tipos para la configuración de la API de Airalo
export interface AiraloApiConfig {
  apiKey: string;
  apiSecret: string;
  apiUrl: string;
  isActive: boolean;
}

// Tipos para productos de Airalo
export interface AiraloProduct {
  id: string;
  name: string;
  description?: string;
  countries: string[];
  validityDays: number;
  dataAmount: number; // En GB
  price: number;
  currency: string;
  isPopular?: boolean;
}

// Tipos para pedidos de Airalo
export interface AiraloOrder {
  id: string;
  productId: string;
  status: 'pending' | 'processed' | 'activated' | 'failed';
  orderedAt: string;
  activationCode?: string;
  qrCode?: string;
  expiresAt?: string;
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
