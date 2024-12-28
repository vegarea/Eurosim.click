import { supabase } from "@/integrations/supabase/client";
import { Customer, ShippingAddress } from "@/types";
import { transformShippingAddress, prepareShippingAddress } from "@/utils/transformations";

export const customerService = {
  async findOrCreateCustomer(customerData: {
    name: string;
    email: string;
    phone?: string;
    passport_number?: string;
    birth_date?: string;
    gender?: string;
    shipping_address?: ShippingAddress | null;
  }): Promise<Customer> {
    console.group('🔍 Customer Service - findOrCreateCustomer');
    console.log('Input customer data:', customerData);

    try {
      console.log('Searching for existing customer with email:', customerData.email);
      const { data: existingCustomer, error: searchError } = await supabase
        .from('customers')
        .select('*')
        .eq('email', customerData.email)
        .maybeSingle();

      if (searchError) {
        console.error('Error searching for customer:', searchError);
        throw searchError;
      }

      console.log('Search result:', existingCustomer);

      // Preparar los datos para actualizar/crear
      const customerPayload = {
        name: customerData.name,
        phone: customerData.phone,
        passport_number: customerData.passport_number,
        birth_date: customerData.birth_date,
        gender: customerData.gender,
        ...(customerData.shipping_address && {
          default_shipping_address: prepareShippingAddress(customerData.shipping_address)
        })
      };

      if (existingCustomer) {
        console.log('Updating existing customer with payload:', customerPayload);
        
        const { data: updatedCustomer, error: updateError } = await supabase
          .from('customers')
          .update(customerPayload)
          .eq('id', existingCustomer.id)
          .select()
          .maybeSingle();

        if (updateError) {
          console.error('Error updating customer:', updateError);
          throw updateError;
        }

        if (!updatedCustomer) {
          console.error('No customer was updated');
          throw new Error('Failed to update customer');
        }

        return {
          ...updatedCustomer,
          default_shipping_address: transformShippingAddress(updatedCustomer.default_shipping_address)
        } as Customer;
      }

      console.log('Creating new customer with payload:', {
        ...customerPayload,
        email: customerData.email
      });

      const { data: newCustomer, error: createError } = await supabase
        .from('customers')
        .insert({
          email: customerData.email,
          ...customerPayload
        })
        .select()
        .maybeSingle();

      if (createError) {
        console.error('Error creating customer:', createError);
        throw createError;
      }

      if (!newCustomer) {
        console.error('No customer was created');
        throw new Error('Failed to create customer');
      }

      return {
        ...newCustomer,
        default_shipping_address: transformShippingAddress(newCustomer.default_shipping_address)
      } as Customer;
    } catch (error) {
      console.error('Error in findOrCreateCustomer:', error);
      throw error;
    } finally {
      console.groupEnd();
    }
  }
};