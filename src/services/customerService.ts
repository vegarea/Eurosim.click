import { supabase } from "@/integrations/supabase/client";
import { Customer, ShippingAddress } from "@/types/database.types";

interface CreateCustomerData {
  name: string;
  email: string;
  phone?: string;
  passport_number?: string;
  birth_date?: string;
  gender?: string;
  shipping_address?: ShippingAddress;
}

export const customerService = {
  async findOrCreateCustomer(data: CreateCustomerData): Promise<Customer> {
    console.log('Finding or creating customer:', data);

    // Buscar cliente existente
    const { data: existing } = await supabase
      .from('customers')
      .select()
      .eq('email', data.email)
      .maybeSingle();

    if (existing) {
      console.log('Found existing customer:', existing);
      
      // Actualizar cliente
      const { data: updated, error: updateError } = await supabase
        .from('customers')
        .update({
          name: data.name,
          phone: data.phone,
          passport_number: data.passport_number,
          birth_date: data.birth_date,
          gender: data.gender,
          default_shipping_address: data.shipping_address || null
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (updateError) throw updateError;
      return updated as Customer;
    }

    // Crear nuevo cliente
    const { data: created, error: createError } = await supabase
      .from('customers')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        passport_number: data.passport_number,
        birth_date: data.birth_date,
        gender: data.gender,
        default_shipping_address: data.shipping_address || null
      })
      .select()
      .single();

    if (createError) throw createError;
    return created as Customer;
  }
};