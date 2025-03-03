
/// <reference types="vite/client" />

interface Window {
  initGoogleMaps: () => void;
  google: any;
  dataLayer: any[];
  gtag: (
    command: string, 
    event: string, 
    params?: {
      send_to?: string;
      value?: number;
      currency?: string;
      transaction_id?: string;
      [key: string]: any;
    }
  ) => void;
}
