import { useState, useEffect } from 'react';
import { airaloClient } from '@/integrations/airalo/airalo-client';
import { AiraloPackage, AiraloOrder, AiraloGetPackagesParams, AiraloWebhookSimulationRequest } from '@/types/airalo/api-types';

/**
 * Hook for interacting with the Airalo API
 * 
 * Provides methods for fetching packages, creating orders, and managing eSIMs
 */
export const useAiraloClient = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the client
  useEffect(() => {
    const initClient = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const success = await airaloClient.initialize();
        setIsInitialized(success);
        
        if (!success) {
          setError('Failed to initialize Airalo client. Please check your configuration.');
        }
      } catch (err) {
        setError('An unexpected error occurred during initialization.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    initClient();
  }, []);

  // Check connection status
  const checkConnection = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const status = await airaloClient.checkStatus();
      return status;
    } catch (err) {
      setError('Failed to check Airalo API connection.');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get available packages with filtering options
  const getPackages = async (params?: AiraloGetPackagesParams): Promise<AiraloPackage[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const packages = await airaloClient.getPackages(params);
      return packages;
    } catch (err) {
      setError('Failed to fetch Airalo packages.');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Get package details
  const getPackageDetails = async (packageId: string): Promise<AiraloPackage | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const packageDetails = await airaloClient.getPackageDetails(packageId);
      return packageDetails;
    } catch (err) {
      setError('Failed to fetch package details.');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Submit an order
  const submitOrder = async ({
    packageId,
    quantity = 1,
    contactPoint,
    description,
    brandSettingsName
  }: {
    packageId: string;
    quantity?: number;
    contactPoint?: string;
    description?: string;
    brandSettingsName?: string;
  }): Promise<AiraloOrder | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const order = await airaloClient.submitOrder({
        package_id: packageId,
        quantity,
        type: 'sim',
        contact_point: contactPoint,
        description,
        brand_settings_name: brandSettingsName
      });
      
      return order;
    } catch (err) {
      setError('Failed to submit order.');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get order details
  const getOrder = async (orderId: string): Promise<AiraloOrder | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const order = await airaloClient.getOrder(orderId);
      return order;
    } catch (err) {
      setError('Failed to fetch order details.');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get list of orders
  const getOrders = async (page: number = 1, limit: number = 10): Promise<AiraloOrder[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const orders = await airaloClient.getOrders(page, limit);
      return orders;
    } catch (err) {
      setError('Failed to fetch orders.');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Get eSIM details
  const getEsim = async (iccid: string): Promise<any | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const esim = await airaloClient.getEsim(iccid);
      return esim;
    } catch (err) {
      setError('Failed to fetch eSIM details.');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get installation instructions
  const getInstallationInstructions = async (
    iccid: string,
    language: string = 'es'
  ): Promise<any | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const instructions = await airaloClient.getInstallationInstructions(iccid, language);
      return instructions;
    } catch (err) {
      setError('Failed to fetch installation instructions.');
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get top-up packages
  const getTopupPackages = async (iccid: string): Promise<AiraloPackage[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const packages = await airaloClient.getTopupPackages(iccid);
      return packages;
    } catch (err) {
      setError('Failed to fetch top-up packages.');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Get available countries
  const getCountries = async (): Promise<any[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const countries = await airaloClient.getCountries();
      return countries;
    } catch (err) {
      setError('Failed to fetch countries.');
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate webhook
  const simulateWebhook = async (request: AiraloWebhookSimulationRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await airaloClient.simulateWebhook(request);
      
      if (!success) {
        setError('Failed to simulate webhook notification.');
      }
      
      return success;
    } catch (err) {
      setError('An error occurred while simulating webhook notification.');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    error,
    checkConnection,
    getPackages,
    getPackageDetails,
    submitOrder,
    getOrder,
    getOrders,
    getEsim,
    getInstallationInstructions,
    getTopupPackages,
    getCountries,
    simulateWebhook
  };
};
