import { supabase } from "@/integrations/supabase/client";
import { Customer, ShippingAddress } from "@/types";

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
      // Primero buscar cliente existente
      console.log('Searching for existing customer with email:', customerData.email);
      const { data: existingCustomer, error: searchError } = await supabase
        .from('customers')
        .select('*')
        .eq('email', customerData.email)
        .maybeSingle();

      if (searchError) {
        console.error('Error searching for customer:', searchError);
        console.error('Error details:', {
          code: searchError.code,
          message: searchError.message,
          details: searchError.details,
          hint: searchError.hint
        });
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
        // Solo incluir shipping_address si se proporciona
        ...(customerData.shipping_address && {
          default_shipping_address: customerData.shipping_address
        })
      };

      if (existingCustomer) {
        console.log('Updating existing customer with payload:', customerPayload);
        
        const { data: updatedCustomer, error: updateError } = await supabase
          .from('customers')
          .update(customerPayload)
          .eq('id', existingCustomer.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating customer:', updateError);
          console.error('Update error details:', {
            code: updateError.code,
            message: updateError.message,
            details: updateError.details,
            hint: updateError.hint
          });
          throw updateError;
        }

        console.log('Customer updated successfully:', updatedCustomer);
        return updatedCustomer as Customer;
      }

      // Crear nuevo cliente
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
        .single();

      if (createError) {
        console.error('Error creating customer:', createError);
        console.error('Creation error details:', {
          code: createError.code,
          message: createError.message,
          details: createError.details,
          hint: createError.hint
        });
        throw createError;
      }

      console.log('New customer created successfully:', newCustomer);
      return newCustomer as Customer;
    } finally {
      console.groupEnd();
    }
  }
};