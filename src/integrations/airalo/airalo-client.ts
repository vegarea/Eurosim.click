
import { supabase } from "@/integrations/supabase/client";
import { AiraloApiConfig } from "@/types/airalo";
import { 
  AiraloApiCredentials,
  AiraloApiResponse,
  AiraloPackage,
  AiraloPackageListResponse,
  AiraloOrder,
  AiraloOrderRequest,
  AiraloESim,
  AiraloGetPackagesParams,
  AiraloCountry
} from "@/types/airalo/api-types";

/**
 * Airalo API Client
 * 
 * This client provides methods for interacting with the Airalo Partner API.
 * It handles authentication, request formatting, and response parsing.
 */
export class AiraloClient {
  private credentials: AiraloApiCredentials | null = null;
  private initialized = false;
  private lastRequestTime: number = 0;
  private requestCount: number = 0;
  private readonly RATE_LIMIT = 40; // 40 requests per minute
  private readonly RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

  /**
   * Initialize the Airalo client with credentials
   */
  async initialize(): Promise<boolean> {
    try {
      // Fetch Airalo settings from Supabase
      const { data, error } = await supabase
        .from('airalo_settings')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error("Error fetching Airalo configuration:", error);
        return false;
      }

      if (!data) {
        console.error("No Airalo configuration found");
        return false;
      }

      const config = data as AiraloApiConfig;

      // Only proceed if configuration is active
      if (!config.is_active) {
        console.warn("Airalo integration is not active");
        return false;
      }

      this.credentials = {
        api_key: config.api_key,
        api_secret: config.api_secret,
        api_url: config.api_url
      };

      this.initialized = true;
      return true;
    } catch (error) {
      console.error("Failed to initialize Airalo client:", error);
      return false;
    }
  }

  /**
   * Throttle requests to respect rate limits
   * Returns a promise that resolves when it's safe to make the next request
   */
  private async throttleRequest(): Promise<void> {
    const now = Date.now();
    
    // Reset counter if we're in a new time window
    if (now - this.lastRequestTime > this.RATE_WINDOW) {
      this.requestCount = 0;
      this.lastRequestTime = now;
      return;
    }
    
    // If we're approaching the rate limit, delay the next request
    if (this.requestCount >= this.RATE_LIMIT) {
      const timeToWait = this.RATE_WINDOW - (now - this.lastRequestTime) + 100; // Add 100ms buffer
      await new Promise(resolve => setTimeout(resolve, timeToWait));
      this.requestCount = 0;
      this.lastRequestTime = Date.now();
      return;
    }
    
    this.requestCount++;
    this.lastRequestTime = now;
  }

  /**
   * Make an authenticated request to the Airalo API
   */
  private async request<T>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    isFormData = false,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<AiraloApiResponse<T>> {
    // Ensure client is initialized
    if (!this.initialized || !this.credentials) {
      await this.initialize();
      
      if (!this.initialized || !this.credentials) {
        return {
          meta: 'failed',
          message: 'Airalo client not initialized'
        };
      }
    }

    // Throttle request if needed
    await this.throttleRequest();

    try {
      const { api_key, api_secret, api_url } = this.credentials;
      let url = `${api_url}${endpoint}`;
      
      // Add query parameters if provided
      if (params) {
        const queryParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
          if (value !== undefined) {
            queryParams.append(key, String(value));
          }
        }
        
        const queryString = queryParams.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }
      
      // Create authorization header
      const authHeader = `Bearer ${api_key}:${api_secret}`;
      
      // Build request options
      const headers: Record<string, string> = {
        'Authorization': authHeader,
        'Accept': 'application/json'
      };
      
      // Don't set Content-Type for FormData, let the browser set it with the boundary
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }
      
      const options: RequestInit = {
        method,
        headers
      };
      
      // Add body for POST/PUT requests
      if (body) {
        if (isFormData) {
          // For FormData, use the FormData object directly
          const formData = new FormData();
          
          // Add each field to the FormData object
          for (const [key, value] of Object.entries(body)) {
            if (value !== undefined && value !== null) {
              formData.append(key, String(value));
            }
          }
          
          options.body = formData;
        } else if (method === 'POST' || method === 'PUT') {
          // For JSON, stringify the body
          options.body = JSON.stringify(body);
        }
      }
      
      // Make the request
      const response = await fetch(url, options);
      const data = await response.json();
      
      // Handle API errors
      if (!response.ok) {
        return {
          meta: 'failed',
          message: data.message || 'Unknown API error',
          code: data.code
        };
      }
      
      return data;
    } catch (error) {
      console.error('Airalo API request failed:', error);
      return {
        meta: 'failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check API connectivity and account status
   */
  async checkStatus(): Promise<boolean> {
    const response = await this.request<{status: string}>('/v2/status');
    return response.meta === 'success';
  }

  /**
   * Get available eSIM packages with filtering options
   */
  async getPackages(params?: AiraloGetPackagesParams): Promise<AiraloPackage[]> {
    const response = await this.request<AiraloPackageListResponse>('/v2/packages', 'GET', undefined, false, params);
    
    if (response.meta === 'success' && response.data?.packages) {
      return response.data.packages;
    }
    
    return [];
  }

  /**
   * Get package details by ID
   */
  async getPackageDetails(packageId: string): Promise<AiraloPackage | null> {
    const response = await this.request<AiraloPackage>(`/v2/packages/${packageId}`);
    
    if (response.meta === 'success' && response.data) {
      return response.data;
    }
    
    return null;
  }

  /**
   * Submit an order for an eSIM package
   * Uses multipart/form-data format as required by the Airalo API
   */
  async submitOrder(orderRequest: AiraloOrderRequest): Promise<AiraloOrder | null> {
    const response = await this.request<AiraloOrder>(
      '/v2/orders',
      'POST',
      orderRequest,
      true // Use FormData for this request
    );
    
    if (response.meta === 'success' && response.data) {
      return response.data;
    }
    
    return null;
  }

  /**
   * Get order details by ID
   */
  async getOrder(orderId: string): Promise<AiraloOrder | null> {
    const response = await this.request<AiraloOrder>(`/v2/orders/${orderId}`);
    
    if (response.meta === 'success' && response.data) {
      return response.data;
    }
    
    return null;
  }

  /**
   * Get list of orders with pagination
   */
  async getOrders(page: number = 1, limit: number = 10): Promise<AiraloOrder[]> {
    const params = { page, limit };
    const response = await this.request<{orders: AiraloOrder[]}>('/v2/orders', 'GET', undefined, false, params);
    
    if (response.meta === 'success' && response.data?.orders) {
      return response.data.orders;
    }
    
    return [];
  }

  /**
   * Get eSIM details by ICCID
   */
  async getEsim(iccid: string): Promise<AiraloESim | null> {
    const response = await this.request<AiraloESim>(`/v2/esims/${iccid}`);
    
    if (response.meta === 'success' && response.data) {
      return response.data;
    }
    
    return null;
  }

  /**
   * Get installation instructions for an eSIM
   */
  async getInstallationInstructions(
    iccid: string, 
    language: string = 'en'
  ): Promise<any | null> {
    const response = await this.request<any>(
      `/v2/esims/${iccid}/installation-instructions`,
      'GET',
      undefined,
      false,
      { language }
    );
    
    if (response.meta === 'success' && response.data) {
      return response.data;
    }
    
    return null;
  }

  /**
   * Get top-up packages for an existing eSIM
   */
  async getTopupPackages(iccid: string): Promise<AiraloPackage[]> {
    const response = await this.request<{packages: AiraloPackage[]}>(`/v2/esims/${iccid}/topup-packages`);
    
    if (response.meta === 'success' && response.data?.packages) {
      return response.data.packages;
    }
    
    return [];
  }

  /**
   * Get available countries
   */
  async getCountries(): Promise<AiraloCountry[]> {
    const response = await this.request<{countries: AiraloCountry[]}>('/v2/countries');
    
    if (response.meta === 'success' && response.data?.countries) {
      return response.data.countries;
    }
    
    return [];
  }
}

// Create a singleton instance
export const airaloClient = new AiraloClient();
