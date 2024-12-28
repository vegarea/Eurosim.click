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
    console.log('Finding or creating customer with data:', customerData);

    // Primero buscar cliente existente
    const { data: existingCustomer, error: searchError } = await supabase
      .from('customers')
      .select('*')
      .eq('email', customerData.email)
      .maybeSingle();

    if (searchError) {
      console.error('Error searching for customer:', searchError);
      throw searchError;
    }

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
      console.log('Found existing customer:', existingCustomer);
      
      // Actualizar cliente existente
      const { data: updatedCustomer, error: updateError } = await supabase
        .from('customers')
        .update(customerPayload)
        .eq('id', existingCustomer.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating customer:', updateError);
        throw updateError;
      }

      return updatedCustomer as Customer;
    }

    // Crear nuevo cliente
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
      throw createError;
    }

    return newCustomer as Customer;
  }
};