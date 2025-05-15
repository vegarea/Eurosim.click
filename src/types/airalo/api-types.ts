
/**
 * API Types for Airalo Integration
 * These types represent the structure of requests and responses when interacting with the Airalo Partner API
 */

// API Authentication
export interface AiraloApiCredentials {
  api_key: string;
  api_secret: string;
  api_url: string;
}

// Common Response Structure
export interface AiraloApiResponse<T> {
  meta: 'success' | 'failed';
  message?: string;
  code?: number;
  data?: T;
}

// Pagination Information
export interface AiraloPagination {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// Paginated Response
export interface AiraloPaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: AiraloPagination;
  };
}

// Country Information
export interface AiraloCountry {
  id: string;
  name: string;
  country_code: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
}

// Operator Information
export interface AiraloOperator {
  id: string;
  name: string;
  types: string[];
  coverages: string[];
  info?: string;
  style?: {
    gradient_start: string;
    gradient_end: string;
  };
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
  type?: 'local' | 'global'; // Type of operator
  slug?: string; // Slug identifier (e.g., 'world', 'europe', etc.)
}

// Package Information
export interface AiraloPackage {
  id: string;
  package_id: string;
  type: 'esim' | 'topup';
  name: string;
  package: string;
  data: string;
  amount: number; // in MB
  day: number;
  validity: number;
  voice?: number;
  text?: number;
  is_unlimited: boolean;
  is_prepaid: boolean;
  is_roaming: boolean;
  is_kyc_verify: boolean;
  price: number;
  currency: string;
  net_price?: number;
  countries: AiraloCountry[];
  operators: AiraloOperator[];
  short_info?: string;
  other_info?: string;
  plan_type: 'data' | 'data-voice' | 'data-voice-text';
  rechargeability?: boolean;
}

// Package List Response
export interface AiraloPackageListResponse {
  packages: AiraloPackage[];
  pagination?: AiraloPagination;
}

// Get Packages Parameters
export interface AiraloGetPackagesParams {
  'filter[type]'?: 'local' | 'global';
  'filter[country]'?: string;
  limit?: number;
  page?: number;
  include?: 'topup';
}

// Order Request
export interface AiraloOrderRequest {
  package_id: string;
  quantity?: number;
  type?: 'sim';
  contact_point?: string;
  description?: string;
  brand_settings_name?: string;
}

// Order Response
export interface AiraloOrder {
  id: string;
  code: string;
  airalo_code?: string;
  iccid: string;
  status: string;
  package: {
    id: string;
    name: string;
    data: string;
    amount: number;
    day: number;
    voice?: number;
    text?: number;
    price: number;
    currency: string;
  };
  qrcode: string;
  qrcode_url: string;
  lpa: string;
  matching_id: string;
  created_at: string;
  expired_at?: string;
  direct_apple_installation_url?: string;
  manual_installation?: string;
  qrcode_installation?: string;
  installation_guides?: {
    [language: string]: string;
  };
  brand_settings_name?: string;
  description?: string;
}

// eSIM Information
export interface AiraloESim {
  iccid: string;
  status: string;
  package: {
    data: string;
    amount: number;
    total: number;
    remaining: number;
    day: number;
    validity: number;
    expired_at: string;
    voice?: {
      total_voice: number;
      remaining_voice: number;
    };
    text?: {
      total_text: number;
      remaining_text: number;
    };
  };
  qrcode: string;
  qrcode_url: string;
  apn?: {
    apn_type: 'automatic' | 'manual';
    apn_value?: string;
  };
  network_setup?: {
    is_roaming: boolean;
  };
  msisdn?: string;
  confirmation_code?: string;
  direct_apple_installation_url?: string;
}

// Installation Instructions
export interface AiraloInstallationInstructions {
  qr_installation: AiraloInstallationSteps[];
  manual_installation: AiraloInstallationSteps[];
  network_setup?: AiraloInstallationSteps[];
}

// Installation Steps
export interface AiraloInstallationSteps {
  model: string;
  version: string;
  steps: {
    description: string;
    images?: {
      url: string;
      width: number;
      height: number;
    }[];
  }[];
}

// Notification Settings
export interface AiraloNotificationSettings {
  contact_point: string;
  levels: {
    order_created: boolean;
    order_activated: boolean;
    esim_expired: boolean;
    esim_about_to_expire: boolean;
    data_depleted: boolean;
    data_about_to_deplete: boolean;
  };
}

// Error Response
export interface AiraloErrorResponse {
  meta: 'failed';
  message: string;
  code: number;
}
